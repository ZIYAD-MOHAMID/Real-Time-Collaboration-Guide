import { handler } from "@/lib/graphql/server";

export async function GET(request: Request) {
  console.log("=== GraphQL API GET ===");
  console.log("Request URL:", request.url);
  console.log(
    "Request headers:",
    Object.fromEntries(request.headers.entries())
  );
  return handler(request);
}

export async function POST(request: Request) {
  console.log("=== GraphQL API POST ===");
  console.log("Request URL:", request.url);
  console.log(
    "Request headers:",
    Object.fromEntries(request.headers.entries())
  );
  return handler(request);
}
