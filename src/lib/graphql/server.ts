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

    let session = null;

    try {
      // 1️⃣ x-user-id header
      const xUserId = req.headers?.["x-user-id"];
      if (xUserId) {
        session = {
          user: {
            id: xUserId,
            email: "user@example.com",
            name: "User",
          },
        };
        console.log("Session from x-user-id:", session);
      }

      // 2️⃣ next-auth.session-token cookie
      if (!session && req.cookies?.["next-auth.session-token"]) {
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: "next-auth.session-token",
        });
        if (token) {
          session = { user: { id: token.id, email: token.email, name: token.name } };
          console.log("Session from cookie token:", session);
        }
      }

      // 3️⃣ Authorization header
      if (!session && req.headers?.authorization?.startsWith("Bearer ")) {
        const token = await getToken({
          req: {
            ...req,
            headers: {
              ...req.headers,
              cookie: `next-auth.session-token=${req.headers.authorization.substring(7)}`,
            },
          } as any,
          secret: process.env.NEXTAUTH_SECRET,
        });
        if (token) {
          session = { user: { id: token.id, email: token.email, name: token.name } };
          console.log("Session from auth header:", session);
        }
      }

      console.log("Final session:", session);
    } catch (error) {
      console.error("Session retrieval error:", error);
    }

    return {
      user: session?.user || null,
      prisma,
    };
  },
});
