"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Auto-redirect to sign-in after 5 seconds
    const timer = setTimeout(() => {
      router.push("/auth/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Callback":
        return "Authentication failed. Please try again.";
      case "OAuthSignin":
        return "Error signing in with OAuth provider.";
      case "OAuthCallback":
        return "Error during OAuth callback.";
      case "OAuthCreateAccount":
        return "Error creating OAuth account.";
      case "EmailCreateAccount":
        return "Error creating email account.";
      case "OAuthAccountNotLinked":
        return "Email already exists with different provider.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      case "Configuration":
        return "Authentication configuration error.";
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in.";
      case "Verification":
        return "Email verification required.";
      case "Default":
        return "Authentication error. Please try again.";
      default:
        return "An unknown error occurred during authentication.";
    }
  };

  const error = searchParams.get("error");
  const errorMessage = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-destructive"
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
          </div>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            You will be redirected to the sign-in page automatically in 5
            seconds.
          </div>

          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Try Again</Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/">Go Home</Link>
            </Button>
          </div>

          {error === "Callback" && (
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
              <p className="font-medium mb-1">Troubleshooting tips:</p>
              <ul className="space-y-1">
                <li>• Check your Google OAuth configuration</li>
                <li>• Ensure redirect URI is set correctly</li>
                <li>• Verify API keys are valid</li>
                <li>• Try using email/password instead</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
