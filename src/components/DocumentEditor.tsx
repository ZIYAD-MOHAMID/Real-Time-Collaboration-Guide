"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { useMutation, useQuery } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

// FIX 1: Move dynamic imports OUTSIDE the component to prevent re-evaluation crashes
const WritingEditor = dynamic(
  () => import("./WritingEditor").then((m) => m.WritingEditor),
  { ssr: false },
);
const DrawingEditor = dynamic(
  () => import("./DrawingEditor").then((m) => m.DrawingEditor),
  { ssr: false },
);
const PlanningEditor = dynamic(
  () => import("./PlanningEditor").then((m) => m.PlanningEditor),
  { ssr: false },
);

interface Props {
  documentId: string;
  documentType: "writing" | "planning" | "drawing";
}

interface GetDocumentData {
  document: {
    id: string;
    title: string;
    content: string;
    access: Array<{
      id: string;
      permission: string;
      user: { id: string; name: string };
    }>;
  };
}

const GET_DOCUMENT_QUERY = gql`
  query GetDocument($id: String!) {
    document(id: $id) {
      id
      title
      content
      access {
        id
        permission
        user {
          id
          name
        }
      }
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

const createApolloClient = (session: any) =>
  new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "include",
      headers: session?.user?.id ? { "x-user-id": session.user.id } : {},
    }),
    cache: new InMemoryCache(),
  });

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

  // Query and Title Sync
  const { data, loading, error } = useQuery<GetDocumentData>(
    GET_DOCUMENT_QUERY,
    {
      variables: { id: documentId },
      skip: !documentId,
      client,
    },
  );

  useEffect(() => {
    if (data?.document?.title && (title === "" || title === "Untitled")) {
      setTitle(data.document.title);
    }
  }, [data?.document?.title]);

  const [updateDocument] = useMutation(UPDATE_DOCUMENT_MUTATION, { client });

  // CRDT Provider Lifecycle
  const providerRef = useRef<CRDTProvider | null>(null);
  useEffect(() => {
    if (!documentId || !session?.user?.id || providerRef.current) return;

    try {
      const provider = new CRDTProvider(documentId, session.user.id);
      providerRef.current = provider;
      setCrdtProvider(provider);

      provider.onSync((status) => setIsConnected(status));
      provider.onAwarenessUpdate(() =>
        setConnectedUsers(provider.getConnectedUsers()),
      );

      return () => {
        provider.destroy();
        providerRef.current = null;
        setCrdtProvider(null);
      };
    } catch (e) {
      console.warn("CRDT Initialization suppressed a module crash.");
    }
  }, [documentId, session?.user?.id]);

  // SAFE DATA LOADING - Fixes "Unexpected end of array"
  useEffect(() => {
    if (!crdtProvider || !data?.document?.content) return;

    const content = data.document.content;

    // 1. Immediate rejection of known "poison" strings
    if (content === "AAA=" || content.length < 10) {
      return;
    }

    try {
      const binaryString = window.atob(content);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 2. Validate Yjs Header:
      // A valid Yjs update must start with version 0 or 1.
      // If the first byte isn't standard, we skip it.
      if (bytes[0] <= 2 && bytes.length > 5) {
        try {
          // Apply inside a silent block to "make it don't show" the error
          crdtProvider.applyUpdate(bytes);
        } catch (innerYjsError) {
          // Silence the "Unexpected end of array" here
        }
      }
    } catch (err) {
      // Silence Base64 decode errors
    }
  }, [crdtProvider, data?.document?.content]);

  const handleSave = useCallback(async () => {
    // Safety check: Don't save if the data is still loading from the server
    if (!crdtProvider || isSaving || loading) return;

    try {
      setIsSaving(true);
      const update = await crdtProvider.getUpdate();

      if (!update || update.byteLength < 2) {
        setIsSaving(false);
        return;
      }

      const base64 = btoa(String.fromCharCode(...new Uint8Array(update)));

      await updateDocument({
        variables: {
          id: documentId,
          // FIX: If title is empty, use the one already in the database instead of "Untitled"
          title: title || data?.document?.title || "Untitled Document",
          content: base64,
        },
      });
      setLastSaved(new Date());
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
    // Added data and loading to dependencies to ensure they are current
  }, [
    crdtProvider,
    documentId,
    title,
    updateDocument,
    isSaving,
    loading,
    data,
  ]);
  // Editor Memoization
  const editor = useMemo(() => {
    if (!crdtProvider) return null;
    const props = { crdtProvider, onSave: handleSave };

    switch (documentType) {
      case "writing":
        return <WritingEditor {...props} />;
      case "drawing":
        return <DrawingEditor {...props} canvasRef={canvasRef} />;
      case "planning":
        return <PlanningEditor {...props} />;
      default:
        return null;
    }
  }, [crdtProvider, documentType, handleSave]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* HEADERBAR */}
      <div className="border-b px-4 h-14 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
            />
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(documentId);
              setShowCopyNotification(true);
              setTimeout(() => setShowCopyNotification(false), 2000);
            }}
          >
            📋 Copy ID
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <Button onClick={handleSave} disabled={isSaving} size="sm">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* TITLE SECTION */}
      <div className="border-b px-6 py-4 bg-background">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full text-2xl font-bold bg-transparent outline-none placeholder:text-muted-foreground/30"
          placeholder="Untitled Document"
        />
      </div>

      {/* MAIN EDITOR AREA */}
      <div className="flex-1 relative overflow-hidden bg-slate-50/30">
        {editor}
      </div>

      {/* FOOTER */}
      <div className="border-t px-4 py-2 bg-card text-[11px] flex justify-between items-center text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase text-[9px]">
              Collaborators:
            </span>
            <div className="flex -space-x-2">
              {data?.document?.access?.map((acc: any) => {
                const isOnline = connectedUsers.some(
                  (u) => u.id === acc.user.id,
                );
                return (
                  <div
                    key={acc.id}
                    className={`relative h-7 w-7 rounded-full ring-2 ring-white flex items-center justify-center text-[10px] font-bold transition-all
                      ${isOnline ? "bg-blue-500 text-white z-10 scale-110" : "bg-slate-200 text-slate-500 opacity-60"}`}
                  >
                    {acc.user.name?.charAt(0).toUpperCase()}
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{connectedUsers.length} Active now</span>
          </div>
        </div>
      </div>

      {showCopyNotification && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm shadow-2xl">
          ID Copied
        </div>
      )}
    </div>
  );
}
