"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ShareDialog } from "@/components/ShareDialog";

const GET_MY_DOCUMENTS = gql`
  query GetMyDocuments {
    myDocuments {
      id
      title
      type
      createdAt
      updatedAt
      owner {
        id
        name
        email
      }
      access {
        id
        user {
          id
          name
          email
        }
        permission
      }
    }
  }
`;

const GET_SHARED_DOCUMENTS = gql`
  query GetSharedDocuments {
    sharedDocuments {
      id
      title
      type
      createdAt
      updatedAt
      owner {
        id
        name
        email
      }
      access {
        id
        user {
          id
          name
          email
        }
        permission
      }
    }
  }
`;

const GET_DOCUMENT_ACCESS = gql`
  query GetDocumentAccess($documentId: String!) {
    document(id: $documentId) {
      id
      access {
        id
        user {
          id
          name
          email
        }
        permission
      }
    }
  }
`;

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocument($title: String!, $type: String!) {
    createDocument(title: $title, type: $type) {
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

const DELETE_DOCUMENT_MUTATION = gql`
  mutation DeleteDocument($id: String!) {
    deleteDocument(id: $id)
  }
`;

interface DocumentListProps {
  onDocumentSelect: (
    id: string,
    type: "planning" | "drawing" | "writing"
  ) => void;
}

export function DocumentList({ onDocumentSelect }: DocumentListProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"my" | "shared">("my");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [shareDialog, setShareDialog] = useState<{
    isOpen: boolean;
    documentId: string;
    title: string;
  }>({
    isOpen: false,
    documentId: "",
    title: "",
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    documentId: string;
    documentTitle: string;
  }>({
    isOpen: false,
    documentId: "",
    documentTitle: "",
  });
  const [newDocumentTitle, setNewDocumentTitle] = useState("");
  const [newDocumentType, setNewDocumentType] = useState<
    "writing" | "drawing" | "planning"
  >("writing");

  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({
          uri: "/api/graphql",
          credentials: "include",
          headers: {
            ...(session && {
              "x-user-id": session.user?.id || "",
            }),
          },
        }),
        cache: new InMemoryCache(),
      }),
    [session?.user?.id]
  );

  const { data: myDocuments, refetch: refetchMyDocuments } = useQuery(
    GET_MY_DOCUMENTS,
    {
      skip: !session,
      client,
    }
  ) as any;

  const { data: sharedDocuments, refetch: refetchSharedDocuments } = useQuery(
    GET_SHARED_DOCUMENTS,
    {
      skip: !session,
      client,
    }
  ) as any;

  const { data: documentAccess, refetch: refetchDocumentAccess } = useQuery(
    GET_DOCUMENT_ACCESS,
    {
      variables: { documentId: shareDialog.documentId },
      skip: !shareDialog.documentId || !session,
      client,
    }
  ) as any;

  const [createDocument] = useMutation(CREATE_DOCUMENT_MUTATION, { client });
  const [deleteDocument] = useMutation(DELETE_DOCUMENT_MUTATION, { client });

  const handleCreateDocument = async () => {
    if (!newDocumentTitle.trim()) return;

    try {
      const result = await createDocument({
        variables: {
          title: newDocumentTitle,
          type: newDocumentType,
        },
        context: {
          headers: {
            "x-user-id": session?.user?.id || "",
          },
        },
      });

      console.log("Document created successfully:", result);

      setNewDocumentTitle("");
      setShowCreateModal(false);

      // Force refresh with a small delay
      setTimeout(async () => {
        console.log("Refreshing document list...");
        await refetchMyDocuments();
        await refetchSharedDocuments();
        console.log("Document list refreshed");
      }, 500);
    } catch (error) {
      console.error("Error creating document:", error);
      // Even if there's an error, try to refresh
      setTimeout(async () => {
        await refetchMyDocuments();
        await refetchSharedDocuments();
      }, 500);
    }
  };

  const handleDeleteDocument = async (
    documentId: string,
    documentTitle: string
  ) => {
    // Show the modern delete confirmation modal
    setDeleteDialog({
      isOpen: true,
      documentId,
      documentTitle,
    });
  };

  const confirmDelete = async () => {
    const { documentId, documentTitle } = deleteDialog;

    try {
      console.log("Attempting to delete document:", documentId);

      const result = await deleteDocument({
        variables: { id: documentId },
        context: {
          headers: {
            "x-user-id": session?.user?.id || "",
          },
        },
      });

      console.log("Document deleted successfully:", result);

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
      `;
      successMessage.textContent = `✓ "${documentTitle}" deleted successfully`;
      document.body.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
        }
      }, 3000);

      // Close the delete dialog
      setDeleteDialog({ isOpen: false, documentId: "", documentTitle: "" });

      // Refresh the document list after deletion
      setTimeout(async () => {
        console.log("Refreshing document list after deletion...");
        await refetchMyDocuments();
        await refetchSharedDocuments();
        console.log("Document list refreshed after deletion");
      }, 500);
    } catch (error) {
      console.error("Error deleting document:", error);

      // Show error message
      const errorMessage = document.createElement("div");
      errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
      `;
      errorMessage.textContent = `✗ Failed to delete "${documentTitle}"`;
      document.body.appendChild(errorMessage);

      // Remove error message after 3 seconds
      setTimeout(() => {
        if (errorMessage.parentNode) {
          errorMessage.parentNode.removeChild(errorMessage);
        }
      }, 3000);

      // Close the delete dialog
      setDeleteDialog({ isOpen: false, documentId: "", documentTitle: "" });
    }
  };

  const refetchDocuments = () => {
    console.log("Document ID being shared:", documentAccess);
    console.log("=== REFETCHING DOCUMENTS ===");
    console.log("Document ID being shared:", shareDialog.documentId);
    console.log(
      "Current myDocuments count:",
      myDocuments?.myDocuments?.length || 0
    );
    console.log(
      "Current sharedDocuments count:",
      sharedDocuments?.sharedDocuments?.length || 0
    );

    setTimeout(async () => {
      console.log("Refreshing document list after sharing...");
      await refetchMyDocuments();
      await refetchSharedDocuments();
      await refetchDocumentAccess(); // Also refresh specific document access
      console.log("=== REFETCH COMPLETE ===");
      console.log(
        "New myDocuments count:",
        myDocuments?.myDocuments?.length || 0
      );
      console.log(
        "New sharedDocuments count:",
        sharedDocuments?.sharedDocuments?.length || 0
      );
      console.log("Document list refreshed after sharing");
    }, 500);
  };

  const handleShareDocument = (documentId: string, title: string) => {
    setShareDialog({
      isOpen: true,
      documentId,
      title,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "planning":
        return "📋";
      case "drawing":
        return "🎨";
      case "writing":
        return "📝";
      default:
        return "📄";
    }
  };

  const getDocumentColor = (type: string) => {
    switch (type) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "drawing":
        return "bg-purple-100 text-purple-800";
      case "writing":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const documents =
    activeTab === "my"
      ? myDocuments?.myDocuments
      : sharedDocuments?.sharedDocuments;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="p-6 border-b bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Workspace
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your collaborative documents
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Document
          </Button>
        </div>

        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl shadow-inner">
          <Button
            variant={activeTab === "my" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("my")}
            className={`flex-1 rounded-lg transition-all duration-200 text-xs ${
              activeTab === "my"
                ? "bg-white dark:bg-slate-600 shadow-md text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-600/50"
            }`}
          >
            <span className="flex items-center justify-center gap-1 text-xs">
              📁
              <span className="hidden sm:inline">My Documents</span>
              {myDocuments?.myDocuments?.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {myDocuments.myDocuments.length}
                </span>
              )}
            </span>
          </Button>
          <Button
            variant={activeTab === "shared" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("shared")}
            className={`flex-1 rounded-lg transition-all duration-200 text-xs ${
              activeTab === "shared"
                ? "bg-white dark:bg-slate-600 shadow-md text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-600/50"
            }`}
          >
            <span className="flex items-center justify-center gap-1 text-xs">
              🤝
              <span className="hidden sm:inline">Shared</span>
              {sharedDocuments?.sharedDocuments?.length > 0 && (
                <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {sharedDocuments.sharedDocuments.length}
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {documents?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                className="w-12 h-12 text-slate-400 dark:text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              {activeTab === "my" ? "No documents yet" : "No shared documents"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {activeTab === "my"
                ? "Create your first document to start collaborating with your team"
                : "Documents shared with you will appear here for easy access"}
            </p>
            {activeTab === "my" && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Document
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {documents?.map((doc: any) => (
              <Card
                key={doc.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 bg-white dark:bg-slate-800 shadow-lg"
                onClick={() => onDocumentSelect(doc.id, doc.type)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-3xl p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 shadow-inner">
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${getDocumentColor(
                                doc.type
                              )}`}
                            >
                              {doc.type}
                            </span>
                            {activeTab === "shared" && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                by {doc.owner.name || doc.owner.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {activeTab === "my" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareDocument(doc.id, doc.title);
                            }}
                            className="opacity-75 hover:opacity-100 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg p-2"
                            title="Share document"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.5 9 12c0-.5-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-4.732 2.684 3 3 0 004.732-2.684zm0 0a3 3 0 00-4.732-2.684 3 3 0 004.732 2.684z"
                              />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDocument(doc.id, doc.title);
                            }}
                            className="opacity-75 hover:opacity-100 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg p-2"
                            title="Delete document"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(doc.updatedAt)}
                      </span>
                      {doc.access?.length > 0 && (
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          {doc.access.length} collaborators
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Document</CardTitle>
              <CardDescription>
                Start a new collaborative document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter document title"
                  value={newDocumentTitle}
                  onChange={(e) => setNewDocumentTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Document Type
                </label>
                <select
                  id="type"
                  value={newDocumentType}
                  onChange={(e) => setNewDocumentType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="writing">📝 Writing Document</option>
                  <option value="drawing">🎨 Drawing Canvas</option>
                  <option value="planning">📋 Planning Board</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateDocument}
                  disabled={!newDocumentTitle.trim()}
                >
                  Create Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <ShareDialog
        documentId={shareDialog.documentId}
        documentTitle={shareDialog.title}
        isOpen={shareDialog.isOpen}
        onClose={() =>
          setShareDialog({ isOpen: false, documentId: "", title: "" })
        }
        onShareComplete={refetchDocuments}
      />

      {/* Delete Confirmation Modal */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Delete Document
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete "{deleteDialog.documentTitle}"?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ This action cannot be undone
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  All shared access will be removed and the document will be
                  permanently deleted.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    setDeleteDialog({
                      isOpen: false,
                      documentId: "",
                      documentTitle: "",
                    })
                  }
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  className="min-w-[100px]"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
