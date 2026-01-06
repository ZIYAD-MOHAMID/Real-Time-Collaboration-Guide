"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
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

const SHARE_DOCUMENT_MUTATION = gql`
  mutation ShareDocument(
    $documentId: String!
    $userId: String!
    $permission: PermissionType!
  ) {
    shareDocument(
      documentId: $documentId
      userId: $userId
      permission: $permission
    ) {
      id
      user {
        id
        name
        email
      }
      permission
    }
  }
`;
const GET_DOCUMENT_ACCESS_QUERY = gql`
  query GetDocumentAccess($documentId: String!) {
    document(id: $documentId) {
      id
      access {
        id
        permission
        user {
          id
          name
          email
        }
      }
    }
  }
`;
const REMOVE_ACCESS_MUTATION = gql`
  mutation RemoveAccess($documentId: String!, $userId: String!) {
    revokeAccess(documentId: $documentId, userId: $userId)
  }
`;
interface User {
  id: string;
  name?: string;
  email: string;
}

interface ShareDocumentResponse {
  id: string;
  user: User;
  permission: "VIEWER" | "EDITOR" | "ADMIN";
}

interface ShareDocumentData {
  shareDocument: ShareDocumentResponse;
}

interface ShareDialogProps {
  documentId: string;
  documentTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onShareComplete?: () => void; // Callback to refresh document list
}

export function ShareDialog({
  documentId,
  documentTitle,
  isOpen,
  onClose,
  onShareComplete,
}: ShareDialogProps) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"VIEWER" | "EDITOR" | "ADMIN">(
    "EDITOR"
  );
  const [shareResults, setShareResults] = useState<ShareDocumentResponse[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Reset share results when document changes
  React.useEffect(() => {
    if (isOpen) {
      // setShareResults([])
      setEmail("");
      setPermission("EDITOR");
      setShowSuccess(false);
      setSuccessMessage("");
    }
  }, [documentId, isOpen]);

  const client = React.useMemo(
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
  const { data: accessData, loading: loadingAccess } = useQuery<{
    document: { access: ShareDocumentResponse[] };
  }>(GET_DOCUMENT_ACCESS_QUERY, {
    variables: { documentId },
    skip: !isOpen || !documentId, // Skip query if dialog is closed or no ID
    fetchPolicy: "network-only", // Always get the latest data
    client,
  });

  React.useEffect(() => {
    if (accessData?.document?.access) {
      setShareResults(accessData.document.access);
    }
  }, [accessData]);

  const [shareDocument] = useMutation<ShareDocumentData>(
    SHARE_DOCUMENT_MUTATION,
    { client }
  );
  const [removeAccess] = useMutation(REMOVE_ACCESS_MUTATION, { client });

  const handleShare = async () => {
    if (!email.trim()) return;

    // 1. Check if the user is already in the list (case-insensitive email check)
    const existingAccess = shareResults.find(
      (result) => result.user.email.toLowerCase() === email.trim().toLowerCase()
    );

    // If the user already exists, we must stop and prompt the user to update their permission instead.
    if (existingAccess) {
      // Option A: If they are already on the target permission, just show success and return.
      if (existingAccess.permission === permission) {
        setSuccessMessage(`${email} already has ${permission} access.`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      }

      // Option B: User is already shared, but with a different permission.
      // Show an error/suggestion to the user.
      setSuccessMessage(
        `Failed: ${email} already has ${existingAccess.permission} access. Use the list below to manage permissions.`
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      return; // Stop the function here
    }

    // 2. Execute the mutation (User is new)
    setIsSharing(true);
    try {
      const result = await shareDocument({
        variables: {
          documentId,
          userId: email,
          permission: permission as any,
        },
      });

      if (result.data) {
        // Success logic
        setShareResults([...shareResults, result.data.shareDocument]);
        setSuccessMessage(`Successfully shared with ${email}`);
        setShowSuccess(true);
        setEmail("");

        if (onShareComplete) {
          onShareComplete();
        }

        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      // Error logic
      console.error("Error sharing document:", error);
      setSuccessMessage(`Failed to share with ${email}`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSharing(false);
    }
  };

  const handleRemoveAccess = async (userId: string) => {
    console.log(userId);

    try {
      await removeAccess({
        variables: {
          documentId,
          userId,
        },
      });
      setShareResults(shareResults.filter((r) => r.user.id !== userId));
      setSuccessMessage("Access removed successfully");
      setShowSuccess(true);

      // Call refresh callback if provided
      if (onShareComplete) {
        onShareComplete();
      }

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      // Log the ENTIRE error object for detailed inspection
      console.error("Error removing access:", error);

      // Log specific details often found in Apollo Client errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.error("GraphQL Errors:", error.graphQLErrors);
        // If you see errors here, the server is confirming the failure (e.g., 'Permission Denied')
        setSuccessMessage(
          error.graphQLErrors[0].message ||
            "Failed to remove access (Permission Denied)"
        );
      } else if (error.networkError) {
        console.error("Network Error:", error.networkError);
        // If you see a network error here, the server is unreachable
        setSuccessMessage("Failed to remove access (Network Error)");
      } else {
        setSuccessMessage("Failed to remove access");
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getPermissionColor = (perm: string) => {
    switch (perm) {
      case "ADMIN":
        return "bg-red-100 text-red-800 border-red-200";
      case "EDITOR":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "VIEWER":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPermissionIcon = (perm: string) => {
    switch (perm) {
      case "ADMIN":
        return "👑";
      case "EDITOR":
        return "✏️";
      case "VIEWER":
        return "👁";
      default:
        return "👤";
    }
  };

  const getPermissionDescription = (perm: string) => {
    switch (perm) {
      case "ADMIN":
        return "Full control - can manage permissions and delete";
      case "EDITOR":
        return "Can edit and share the document";
      case "VIEWER":
        return "Can only view the document";
      default:
        return "Unknown permission";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              📤
            </div>
            Share "{documentTitle}"
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">
            Invite collaborators to work on this document
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Success/Error Message */}
          {showSuccess && (
            <div
              className={`p-3 rounded-lg border ${
                successMessage.includes("Failed")
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {successMessage.includes("Failed") ? "❌" : "✅"}
                </span>
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Share Form */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 text-base border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                onKeyPress={(e) => e.key === "Enter" && handleShare()}
              />
            </div>

            <div>
              <label
                htmlFor="permission"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
              >
                Permission Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "VIEWER",
                    icon: "👁",
                    label: "Viewer",
                    desc: "View only",
                  },
                  {
                    value: "EDITOR",
                    icon: "✏️",
                    label: "Editor",
                    desc: "Can edit",
                  },
                  {
                    value: "ADMIN",
                    icon: "👑",
                    label: "Admin",
                    desc: "Full access",
                  },
                ].map((perm) => (
                  <button
                    key={perm.value}
                    onClick={() => setPermission(perm.value as any)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                      permission === perm.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{perm.icon}</div>
                    <div className="text-xs font-medium">{perm.label}</div>
                    <div className="text-xs opacity-75">{perm.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {getPermissionDescription(permission)}
              </div>
            </div>

            <Button
              onClick={handleShare}
              disabled={!email.trim() || isSharing}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSharing ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
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
                  Sharing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Share
                </div>
              )}
            </Button>
          </div>

          {/* Current Collaborators */}
          {loadingAccess ? (
            <div className="flex justify-center items-center p-8 text-blue-500">
              <svg
                className="w-6 h-6 animate-spin mr-3"
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
              Loading collaborators...
            </div>
          ) : (
            shareResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Current Collaborators ({shareResults.length})
                  </h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Click × to remove access
                  </div>
                </div>

                <div className="space-y-3">
                  {shareResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {result.user.name?.[0] ||
                            result.user.email?.[0] ||
                            "U"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {result.user.name || result.user.email}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {result.user.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-xs px-3 py-1.5 rounded-full font-medium border ${getPermissionColor(
                            result.permission
                          )}`}
                        >
                          <span className="mr-1">
                            {getPermissionIcon(result.permission)}
                          </span>
                          {result.permission}
                        </span>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAccess(result.user.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg p-2 transition-all duration-200"
                          title="Remove access"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium"
            >
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
