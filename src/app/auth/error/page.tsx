"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/auth/signin"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const error = searchParams.get("error");
  const errorMessage = error
    ? {
        Callback: "Authentication failed. Please try again.",
        OAuthSignin: "Error signing in with OAuth provider.",
        OAuthCallback: "Error during OAuth callback.",
        OAuthCreateAccount: "Error creating OAuth account.",
        EmailCreateAccount: "Error creating email account.",
        OAuthAccountNotLinked: "Email already exists with different provider.",
        SessionRequired: "Please sign in to access this page.",
        Configuration: "Authentication configuration error.",
        AccessDenied: "Access denied. You do not have permission to sign in.",
        Verification: "Email verification required.",
        Default: "Authentication error. Please try again."
      }[error] || "An unknown error occurred during authentication."
    : "An unknown error occurred.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            You will be redirected to the sign-in page automatically in 5 seconds.
          </div>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full"><Link href="/auth/signin">Try Again</Link></Button>
            <Button variant="outline" asChild className="w-full"><Link href="/">Go Home</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
