"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { CRDTProvider } from "@/lib/crdt/provider";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useSubscription, useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { Button } from "@/components/ui/Button";

interface DocumentEditorProps {
  documentId: string;
  documentType: "planning" | "drawing" | "writing";
}

const GET_DOCUMENT_QUERY = gql`
  query GetDocument($id: String!) {
    document(id: $id) {
      id
      title
      type
      content
      createdAt
      updatedAt
      owner {
        id
        name
        email
      }
    }
  }
`;
const DOCUMENT_UPDATED_SUBSCRIPTION = gql`
  subscription DocumentUpdated($documentId: String!) {
    documentUpdated(documentId: $documentId) {
      id
      title
      content
      updatedAt
    }
  }
`;
const UPDATE_DOCUMENT_MUTATION = gql`
  mutation UpdateDocument($id: String!, $title: String, $content: Bytes) {
    updateDocument(id: $id, title: $title, content: $content) {
      id
      title
      content
      updatedAt
    }
  }
`;
const ACTIVE_USERS_SUBSCRIPTION = gql`
  subscription ActiveUsers($documentId: String!) {
    activeUsers(documentId: $documentId) {
      id
      name
      email
      cursor {
        x
        y
      }
      color
      isActive
      lastSeen
    }
  }
`;

export function DocumentEditor({
  documentId,
  documentType,
}: DocumentEditorProps) {
  const { data: session } = useSession();
  const [crdtProvider, setCrdtProvider] = useState<CRDTProvider | null>(null);
  const [title, setTitle] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [roomInfo, setRoomInfo] = useState({
    id: documentId,
    type: documentType,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create Apollo Client for document queries
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({
          uri: "/api/graphql",
          credentials: "include",
          headers: session?.user?.id ? { "x-user-id": session.user.id } : {},
        }),
        cache: new InMemoryCache(),
      }),
    [session?.user?.id]
  );
  
  // Query document details
  const { data: documentData } = useQuery(GET_DOCUMENT_QUERY, {
    variables: { id: documentId },
    skip: !documentId,
    client,
  }) as any;
  const { data: subscriptionData } = useSubscription(
    DOCUMENT_UPDATED_SUBSCRIPTION,
    {
      variables: { documentId },
      skip: !documentId,
    }
  ) as any;
  const { data: activeUsersData } = useSubscription(ACTIVE_USERS_SUBSCRIPTION, {
    variables: { documentId },
    skip: !documentId,
  }) as any;
  const [updateDocument] = useMutation(UPDATE_DOCUMENT_MUTATION, {
    client,
    context: {
      headers: {
        ...(session && {
          "x-user-id": session.user?.id || "",
        }),
      },
    },
  });

  // Set title when document data loads
  useEffect(() => {
    if (!documentData?.document?.title) return;
    setTitle((prev) => prev || documentData.document.title);
  }, [documentData?.document?.title]);
useEffect(() => {
  if (!session?.user?.id || !documentId) return;

  const provider = new CRDTProvider(documentId, session.user.id);
  setCrdtProvider(provider);

  provider.onSync(setIsConnected);
  provider.onAwarenessUpdate(() => {
    setConnectedUsers(provider.getConnectedUsers());
  });

  return () => provider.destroy();
}, [documentId, session?.user?.id]);
  useEffect(() => {
    if (subscriptionData?.documentUpdated && crdtProvider) {
      // Handle real-time updates
      console.log("Document updated:", subscriptionData.documentUpdated);
    }
  }, [subscriptionData, crdtProvider]);
  useEffect(() => {
    if (activeUsersData?.activeUsers) {
      setConnectedUsers(activeUsersData.activeUsers);
    }
  }, [activeUsersData]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleAutoSave = async () => {
    if (crdtProvider) {
      try {
        const content = await crdtProvider.syncWithDatabase();
        await updateDocument({
          variables: {
            id: documentId,
            title: title,
          },
        });
        console.log("Auto-saved document successfully");
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }
  };

  const getUserColor = (userId: string) => {
    const colors = [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
    ];
    const index = userId.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const handleSave = useCallback(async () => {
    if (!crdtProvider || isSaving) return;

    try {
      setIsSaving(true);
      console.log("Starting save process for document type:", documentType);
      
      // Force sync with database - this will get latest content from all editors
      const content = await crdtProvider.syncWithDatabase();
      console.log("Content synced, size:", content.length);
      console.log("Document title being saved:", title);
      
      // Update document via GraphQL (title and content)
      const result = await updateDocument({
        variables: { id: documentId, title, content },
      });
      console.log("GraphQL update result:", result);
      
      setLastSaved(new Date());
      console.log("Document saved successfully");
      
      // Show success feedback
      if ((result as any)?.data?.updateDocument) {
        console.log("Document updated in database");
        // Optional: Show success toast
        alert("Document saved successfully!");
      }
    } catch (error) {
      console.error("Save failed:", error);
      // Show error feedback to user
      alert(`Save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSaving(false);
    }
  }, [crdtProvider, documentId, title, updateDocument, isSaving]);
const editor = useMemo(() => {
  if (!crdtProvider) return null;

  switch (documentType) {
    case "writing":
      return <WritingEditor crdtProvider={crdtProvider} onSave={handleSave} />;
    case "drawing":
      return <DrawingEditor crdtProvider={crdtProvider} canvasRef={canvasRef} onSave={handleSave} />;
    case "planning":
      return <PlanningEditor crdtProvider={crdtProvider} onSave={handleSave} />;
    default:
      return null;
  }
}, [documentType, crdtProvider, handleSave]);

  // Add keyboard shortcut for save
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
  return (
    <div className="flex flex-col h-full">
      {/* Header with Room Info */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>

            {/* Room ID - More Prominent */}
            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-md border">
              <span className="text-xs text-muted-foreground">Room:</span>
              <span className="font-mono font-bold text-primary text-sm">
                {roomInfo.id}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(roomInfo.id);
                  setShowCopyNotification(true);
                  setTimeout(() => setShowCopyNotification(false), 2000);
                }}
                className="ml-2"
                title="Copy Room ID"
              >
                📋 Copy
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Type:{" "}
              <span className="font-medium text-foreground capitalize">
                {roomInfo.type}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Active Users */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {connectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="w-6 h-6 rounded-full border-2 border-background flex items-center justify-center"
                    style={{ backgroundColor: getUserColor(user.id) }}
                    title={user.name || user.email}
                  >
                    <span className="text-xs text-white font-medium">
                      {user.name?.[0] || user.email?.[0] || "U"}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {connectedUsers.length} active
              </span>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                  </svg>
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="border-b bg-muted/30 px-4 py-3">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-xl font-semibold bg-transparent border-none outline-none w-full"
          placeholder="Document title"
        />
      </div>

      {/* Document Content */}
      <div className="flex-1 relative overflow-hidden">
{editor}

        {/* Live Cursors for Drawing */}
        {documentType === "drawing" &&
          connectedUsers.map(
            (user) =>
              user.cursor && (
                <div
                  key={user.id}
                  className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none"
                  style={{
                    left: user.cursor.x,
                    top: user.cursor.y,
                    backgroundColor: getUserColor(user.id),
                    transform: "translate(-50%, -50%)",
                  }}
                  title={user.name || user.email}
                />
              )
          )}
      </div>

      {/* Status Bar */}
      <div className="border-t bg-muted/30 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>Last updated: {lastSaved ? lastSaved.toLocaleTimeString() : new Date().toLocaleTimeString()}</div>
          <div>
            {connectedUsers.map((user) => (
              <span key={user.id} className="inline-flex items-center mr-3">
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: getUserColor(user.id) }}
                />
                {user.name || user.email}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copy Notification Toast */}
      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <span>📋 Room ID copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}

function WritingEditor({
  crdtProvider,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  onSave?: () => Promise<void>;
}) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState("16");
  const [showToolbar, setShowToolbar] = useState(true);

  useEffect(() => {
    if (!crdtProvider) return;

    const yText = crdtProvider.getText("content");
    setContent(yText.toString());

    const observer = () => {
      const newContent = yText.toString();
      setContent(newContent);
      updateStats(newContent);
      
      // Trigger auto-save after content changes
      const timeoutId = setTimeout(() => {
        handleAutoSave();
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId);
    };

    yText.observe(observer);
    return () => yText.unobserve(observer);
  }, [crdtProvider]);

  const updateStats = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    const readingMins = Math.ceil(words / 200); // Average reading speed: 200 words/min
    
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(readingMins);
  };

  const handleAutoSave = async () => {
    if (!crdtProvider || isSaving) return;

    setIsSaving(true);
    try {
      const content = await crdtProvider.syncWithDatabase();
      console.log("Writing content auto-saved");
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateStats(newContent);

    if (crdtProvider) {
      const yText = crdtProvider.getText("content");
      yText.delete(0, yText.length);
      yText.insert(0, newContent);
    }
  };

  const handleFormat = (format: string) => {
    if (!crdtProvider) return;
    
    const yText = crdtProvider.getText("content");
    const currentContent = yText.toString();
    
    // Simple formatting operations
    let formattedContent = currentContent;
    switch (format) {
      case "uppercase":
        formattedContent = currentContent.toUpperCase();
        break;
      case "lowercase":
        formattedContent = currentContent.toLowerCase();
        break;
      case "clear":
        formattedContent = "";
        break;
    }
    
    yText.delete(0, yText.length);
    yText.insert(0, formattedContent);
    setContent(formattedContent);
    updateStats(formattedContent);
  };

  const exportContent = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="px-2 py-1 text-xs border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
              </select>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormat("uppercase")}
                  title="Uppercase"
                >
                  Aa
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormat("lowercase")}
                  title="Lowercase"
                >
                  aa
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormat("clear")}
                  title="Clear"
                >
                  Clear
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={exportContent}
                title="Export"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowToolbar(!showToolbar)}
                title="Toggle Toolbar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onSave}
                disabled={!onSave}
                title="Save Document (Ctrl+S)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                </svg>
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title="Toggle Fullscreen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="border-b bg-muted/20 px-4 py-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
            <span>Reading time: {readingTime} min</span>
          </div>
          {lastSaved && (
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full p-4 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          style={{ fontSize: `${fontSize}px` }}
          placeholder="Start writing your document..."
        />
      </div>
      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          {isSaving ? (
            <span className="flex items-center text-blue-600">
              <svg
                className="w-3 h-3 mr-1 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Saving...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Ready to save</span>
          )}
        </div>
        <div className="text-xs">Auto-save enabled</div>
      </div>
    </div>
  );
}
function DrawingEditor({
  crdtProvider,
  canvasRef,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onSave?: () => Promise<void>;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<"pen" | "eraser" | "rectangle" | "circle">("pen");
  const [currentColor, setCurrentColor] = useState("#3b82f6");
  const [lineWidth, setLineWidth] = useState(2);
  const [showToolbar, setShowToolbar] = useState(true);

  const colors = [
    "#000000", "#ef4444", "#f59e0b", "#10b981", 
    "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280"
  ];

  useEffect(() => {
    if (!crdtProvider || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const yMap = crdtProvider.getMap("drawing");
    let lastX = 0;
    let lastY = 0;
    let startX = 0;
    let startY = 0;

    const handleAutoSave = async () => {
      if (crdtProvider && !isSaving && onSave) {
        setIsSaving(true);
        try {
          const content = await crdtProvider.syncWithDatabase();
          console.log("Drawing auto-saved");
          setLastSaved(new Date());
        } catch (error) {
          console.error("Drawing auto-save failed:", error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const paths = yMap.get("paths") || [];
      
      paths.forEach((path: any) => {
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.lineWidth;
        ctx.lineCap = "round";
        
        if (path.type === "line") {
          ctx.beginPath();
          ctx.moveTo(path.from.x, path.from.y);
          ctx.lineTo(path.to.x, path.to.y);
          ctx.stroke();
        } else if (path.type === "rectangle") {
          ctx.beginPath();
          ctx.rect(path.x, path.y, path.width, path.height);
          ctx.stroke();
        } else if (path.type === "circle") {
          ctx.beginPath();
          ctx.arc(path.x, path.y, path.radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    };

    const startDrawing = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      startX = lastX;
      startY = lastY;
      setIsDrawing(true);

      if (currentTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = lineWidth * 3;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
      }
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === "pen" || currentTool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Store drawing data in CRDT
        const paths = yMap.get("paths") || [];
        paths.push({
          type: "line",
          from: { x: lastX, y: lastY },
          to: { x, y },
          color: currentColor,
          lineWidth,
          tool: currentTool
        });
        yMap.set("paths", paths);

        lastX = x;
        lastY = y;
      } else if (currentTool === "rectangle" || currentTool === "circle") {
        redrawCanvas();
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        
        if (currentTool === "rectangle") {
          ctx.beginPath();
          ctx.rect(startX, startY, x - startX, y - startY);
          ctx.stroke();
        } else {
          const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
          ctx.beginPath();
          ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }

      // Trigger auto-save after drawing
      setTimeout(handleAutoSave, 1000);
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      
      if (currentTool === "rectangle" || currentTool === "circle") {
        const rect = canvas.getBoundingClientRect();
        const endX = event instanceof MouseEvent ? event.clientX - rect.left : startX;
        const endY = event instanceof MouseEvent ? event.clientY - rect.top : startY;
        
        const paths = yMap.get("paths") || [];
        if (currentTool === "rectangle") {
          paths.push({
            type: "rectangle",
            x: Math.min(startX, endX),
            y: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            color: currentColor,
            lineWidth
          });
        } else {
          const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          paths.push({
            type: "circle",
            x: startX,
            y: startY,
            radius,
            color: currentColor,
            lineWidth
          });
        }
        yMap.set("paths", paths);
      }
      
      setIsDrawing(false);
      handleAutoSave();
    };

    // Load existing drawing
    redrawCanvas();

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [crdtProvider, currentTool, currentColor, lineWidth, isSaving]);

  const clearCanvas = () => {
    if (!crdtProvider || !canvasRef.current) return;
    
    const yMap = crdtProvider.getMap("drawing");
    yMap.set("paths", []);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const exportCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.png';
    a.click();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Drawing Toolbar */}
      {showToolbar && (
        <div className="border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Tool Selection */}
              <div className="flex items-center space-x-1">
                <Button
                  variant={currentTool === "pen" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTool("pen")}
                  title="Pen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </Button>
                <Button
                  variant={currentTool === "eraser" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTool("eraser")}
                  title="Eraser"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
                <Button
                  variant={currentTool === "rectangle" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTool("rectangle")}
                  title="Rectangle"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="6" width="16" height="12" strokeWidth={2} />
                  </svg>
                </Button>
                <Button
                  variant={currentTool === "circle" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTool("circle")}
                  title="Circle"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                  </svg>
                </Button>
              </div>

              {/* Color Picker */}
              <div className="flex items-center space-x-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-6 h-6 rounded border-2 ${
                      currentColor === color ? "border-ring" : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Line Width */}
              <select
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="px-2 py-1 text-xs border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="1">Thin</option>
                <option value="2">Normal</option>
                <option value="4">Medium</option>
                <option value="8">Thick</option>
              </select>

              {/* Actions */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCanvas}
                title="Clear Canvas"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={exportCanvas}
                title="Export"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowToolbar(!showToolbar)}
              title="Toggle Toolbar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              disabled={!onSave}
              title="Save Document (Ctrl+S)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full border border-input rounded-md bg-white cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>
      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          {isSaving ? (
            <span className="flex items-center text-blue-600">
              <svg
                className="w-3 h-3 mr-1 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Saving drawing...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Ready to draw</span>
          )}
        </div>
        <div className="text-xs">Auto-save enabled</div>
      </div>
    </div>
  );
}
function PlanningEditor({
  crdtProvider,
  onSave,
}: {
  crdtProvider: CRDTProvider | null;
  onSave?: () => Promise<void>;
}) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "name">("date");

  useEffect(() => {
    if (!crdtProvider) return;

    const yArray = crdtProvider.getArray("tasks");
    setTasks(yArray.toJSON());

    const observer = () => {
      setTasks(yArray.toJSON());
      setTimeout(handleAutoSave, 1000);
    };

    yArray.observe(observer);
    return () => yArray.unobserve(observer);
  }, [crdtProvider]);

  const handleAutoSave = async () => {
    if (crdtProvider && !isSaving && onSave) {
      setIsSaving(true);
      try {
        const content = await crdtProvider.syncWithDatabase();
        console.log("Planning tasks auto-saved");
        setLastSaved(new Date());
      } catch (error) {
        console.error("Planning auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const addTask = () => {
    if (!crdtProvider || !newTaskText.trim()) return;
    
    const yArray = crdtProvider.getArray("tasks");
    yArray.push([{
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      dueDate: null,
      tags: []
    }]);
    setNewTaskText("");
  };

  const updateTask = (index: number, updates: Partial<any>) => {
    if (!crdtProvider) return;
    
    const yArray = crdtProvider.getArray("tasks");
    const task = yArray.get(index);
    yArray.delete(index);
    yArray.insert(index, [{ ...task, ...updates }]);
  };

  const deleteTask = (index: number) => {
    if (!crdtProvider) return;
    
    const yArray = crdtProvider.getArray("tasks");
    yArray.delete(index);
  };

  const toggleTask = (index: number) => {
    const task = tasks[index];
    updateTask(index, { completed: !task.completed });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === "name") return a.text.localeCompare(b.text);
    return 0;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4">
        {/* Stats Bar */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex space-x-4">
              <span className="font-medium">Total: {taskStats.total}</span>
              <span className="text-blue-600">Active: {taskStats.active}</span>
              <span className="text-green-600">Completed: {taskStats.completed}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}% complete
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button onClick={addTask} size="sm" disabled={!newTaskText.trim()}>
              Add Task
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              disabled={!onSave}
              title="Save Document (Ctrl+S)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
              Save
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {filter === "completed" ? "No completed tasks yet" : 
               filter === "active" ? "No active tasks" : 
               "No tasks yet. Add one above!"}
            </div>
          ) : (
            sortedTasks.map((task, index) => {
              const originalIndex = tasks.findIndex(t => t.id === task.id);
              return (
                <div
                  key={task.id}
                  className={`flex items-center space-x-3 p-3 border border-input rounded-md transition-colors ${
                    task.completed ? "bg-muted/30" : "bg-background"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(originalIndex)}
                    className="w-4 h-4"
                  />
                  
                  <div className="flex-1">
                    <div className={`flex items-center space-x-2 ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}>
                      <span className="font-medium">{task.text}</span>
                      
                      {/* Priority Badge */}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "high" ? "bg-red-100 text-red-700" :
                        task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {/* Task Meta */}
                    <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                      <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                      {task.dueDate && (
                        <span>• Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(originalIndex, { priority: e.target.value })}
                      className="px-2 py-1 text-xs border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(originalIndex)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="border-t bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          {isSaving ? (
            <span className="flex items-center text-blue-600">
              <svg
                className="w-3 h-3 mr-1 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Saving tasks...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Ready to plan</span>
          )}
        </div>
        <div className="text-xs">Auto-save enabled</div>
      </div>
    </div>
  );
}
