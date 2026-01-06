import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { getToken } from "next-auth/jwt";
import { prisma } from "../prisma";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateNextHandler(server, {
  context: async (req: any) => {
    console.log("=== GraphQL Context Debug ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request headers:", req.headers);
    console.log("Request cookies:", req.cookies);

    // Try to get token from multiple sources
    let token = null;
    let session = null;

    try {
      // Method 1: Try x-user-id header (our custom header)
      if (req.headers?.["x-user-id"]) {
        console.log("Found x-user-id header:", req.headers["x-user-id"]);
        // Create a minimal session object
        session = {
          user: {
            id: req.headers["x-user-id"],
            email: "user@example.com",
            name: "User",
          },
        };
        console.log("Created session from x-user-id:", session);
      }

      // Method 2: Try JWT token from cookies
      if (!session && req.cookies?.["next-auth.session-token"]) {
        console.log(
          "Found session token in cookies:",
          req.cookies["next-auth.session-token"]
        );
        token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: "next-auth.session-token",
        });
        console.log("Token from cookies:", token);

        if (token) {
          session = {
            user: {
              id: token.id,
              email: token.email,
              name: token.name,
            },
          };
        }
      }

      // Method 3: Try authorization header
      if (!session && req.headers?.authorization) {
        const authHeader = req.headers.authorization;
        console.log("Found auth header:", authHeader);
        if (authHeader.startsWith("Bearer ")) {
          token = await getToken({
            req: {
              ...req,
              headers: {
                ...req.headers,
                cookie: `next-auth.session-token=${authHeader.substring(7)}`,
              },
            } as any,
            secret: process.env.NEXTAUTH_SECRET,
          });
          console.log("Token from auth header:", token);

          if (token) {
            session = {
              user: {
                id: token.id,
                email: token.email,
                name: token.name,
              },
            };
          }
        }
      }

      console.log("Final session:", session);
      console.log("=== End Debug ===");
    } catch (error) {
      console.error("Session retrieval error:", error);
    }

    return {
      user: session?.user || null,
      prisma,
    };
  },
});
