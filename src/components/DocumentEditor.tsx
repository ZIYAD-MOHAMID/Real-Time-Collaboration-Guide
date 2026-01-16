"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { useMutation, useQuery } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { Button } from "@/components/ui/Button";
import { WritingEditor } from "./WritingEditor";
import { DrawingEditor } from "./DrawingEditor";
import { PlanningEditor } from "./PlanningEditor";

interface Props {
  documentId: string;
  documentType: "writing" | "planning" | "drawing";
}

/* ================= GRAPHQL ================= */

const GET_DOCUMENT_QUERY = gql`
  query GetDocument($id: String!) {
    document(id: $id) {
      id
      title
      content
    }
  }
`;

const UPDATE_DOCUMENT_MUTATION = gql`
  mutation UpdateDocument($id: String!, $title: String, $content: Bytes) {
    updateDocument(id: $id, title: $title, content: $content) {
      id
      updatedAt
    }
  }
`;

/* ================= APOLLO ================= */

const createApolloClient = (session: any) =>
  new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "include",
      headers: session?.user?.id ? { "x-user-id": session.user.id } : {},
    }),
    cache: new InMemoryCache(),
  });

/* ================= COMPONENT ================= */

export default function DocumentEditor({ documentId, documentType }: Props) {
  const { data: session } = useSession();

  const [crdtProvider, setCrdtProvider] = useState<CRDTProvider | null>(null);
  const [title, setTitle] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const client = useMemo(() => createApolloClient(session), [session]);

  const { data } = useQuery<{
    document: { id: string; title: string; content: string };
  }>(GET_DOCUMENT_QUERY, {
    variables: { id: documentId },
    skip: !documentId,
    client,
  });

  const [updateDocument] = useMutation(UPDATE_DOCUMENT_MUTATION, { client });

  /* ================= CRDT INIT ================= */

  useEffect(() => {
    if (!documentId || !session?.user?.id) return;

    const provider = new CRDTProvider(documentId, session.user.id);
    setCrdtProvider(provider);

    provider.onSync(setIsConnected);
    provider.onAwarenessUpdate(() =>
      setConnectedUsers(provider.getConnectedUsers())
    );

    return () => provider.destroy();
  }, [documentId, session?.user?.id]);

  /* ================= LOAD DOCUMENT INTO YJS ================= */

  useEffect(() => {
    if (!crdtProvider || !data?.document) return;

    setTitle(data.document.title || "");

    if (data.document.content) {
      const binary = Uint8Array.from(atob(data.document.content), (c) =>
        c.charCodeAt(0)
      );

      crdtProvider.applyUpdate(binary);
    }
  }, [crdtProvider, data?.document]);

  /* ================= SAVE ================= */

  const handleSave = useCallback(async () => {
    if (!crdtProvider || isSaving) return;

    try {
      setIsSaving(true);

      const update = await crdtProvider.getUpdate();

      const base64 = btoa(String.fromCharCode(...new Uint8Array(update)));

      await updateDocument({
        variables: {
          id: documentId,
          title,
          content: base64,
        },
      });

      setLastSaved(new Date());
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  }, [crdtProvider, documentId, title, updateDocument, isSaving]);

  /* ================= CTRL + S ================= */

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleSave]);

  /* ================= EDITOR ================= */

  const editor = useMemo(() => {
    if (!crdtProvider) return null;

    switch (documentType) {
      case "writing":
        return (
          <WritingEditor crdtProvider={crdtProvider} onSave={handleSave} />
        );
      case "drawing":
        return (
          <DrawingEditor
            crdtProvider={crdtProvider}
            canvasRef={canvasRef}
            onSave={handleSave}
          />
        );
      case "planning":
        return (
          <PlanningEditor crdtProvider={crdtProvider} onSave={handleSave} />
        );
      default:
        return null;
    }
  }, [crdtProvider, documentType, handleSave]);

  /* ================= UI ================= */

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(documentId);
              setShowCopyNotification(true);
              setTimeout(() => setShowCopyNotification(false), 2000);
            }}
          >
            📋 Room ID
          </Button>
        </div>

        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Title */}
      <div className="border-b px-4 py-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-semibold bg-transparent outline-none"
          placeholder="Document title"
        />
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">{editor}</div>

      {/* Footer */}
      <div className="border-t px-4 py-2 text-xs flex justify-between">
        <span>
          Last saved:{" "}
          {lastSaved ? lastSaved.toLocaleTimeString() : "Not saved yet"}
        </span>

        <div className="flex gap-3">
          {connectedUsers.map((u) => (
            <span key={u.id}>{u.name || "User"}</span>
          ))}
        </div>
      </div>

      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
          Room ID copied
        </div>
      )}
    </div>
  );
}
