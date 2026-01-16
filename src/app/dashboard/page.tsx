"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DocumentList } from "@/components/DocumentList";
import DocumentEditor from "@/components/DocumentEditor";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql",
  }),
  cache: new InMemoryCache(),
});

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string;
    type: "planning" | "drawing" | "writing";
  } | null>(null);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useEffect
  }

  const handleDocumentSelect = (
    documentId: string,
    documentType: "planning" | "drawing" | "writing"
  ) => {
    setSelectedDocument({ id: documentId, type: documentType });
  };

  const handleBackToList = () => {
    setSelectedDocument(null);
  };

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="flex items-center space-x-4">
              {selectedDocument && (
                <Button variant="ghost" size="sm" onClick={handleBackToList}>
                  ← Back
                </Button>
              )}
              <h1 className="text-xl font-semibold">Collaborative Workspace</h1>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="/api/auth/signout">Sign out</a>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {selectedDocument ? (
            <div className="flex-1">
              <DocumentEditor
                documentId={selectedDocument.id}
                documentType={selectedDocument.type}
              />
            </div>
          ) : (
            <div className="flex flex-1">
              <div className="w-96 border-r bg-muted/0">
                <DocumentList onDocumentSelect={handleDocumentSelect} />
              </div>
              <div className="flex-1 flex items-center justify-center p-8">
                <Card className="w-full max-w-md text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <CardTitle>Welcome to your workspace</CardTitle>
                    <CardDescription>
                      Select a document from the sidebar to start collaborating
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>📝 Create and edit documents together</p>
                      <p>🎨 Draw and sketch in real-time</p>
                      <p>📋 Plan and organize collaboratively</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}
