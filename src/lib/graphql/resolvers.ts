import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { GraphQLScalarType, StringValueNode } from "graphql";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { sendInviteEmail, sendRevocationEmail } from "@/lib/mail";
import * as Y from "yjs";

const prisma = new PrismaClient();
const pubsub = new PubSub();

const getSafeUserId = async (context: any) => {
  // 1. Check if the user ID exists in the context (from headers or session)
  const userId = context?.user?.id || context?.headers?.["x-user-id"];
  console.log(userId);
  console.log(context?.headers?.["x-user-id"]);

  if (!userId) {
    console.error("❌ No User ID found in context!");
    throw new Error("Authentication required: Please sign in.");
  }

  // 2. Verify the user actually exists in your database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.error(`❌ User with ID ${userId} not found in database.`);
    throw new Error("User session invalid. Please log out and log in again.");
  }

  return user.id;
};

export const resolvers = {
  Bytes: new GraphQLScalarType({
    name: "Bytes",
    description: "Byte array scalar",
    serialize: (v: unknown): string => {
      if (Buffer.isBuffer(v)) return v.toString("base64");
      if (typeof v === "string") return Buffer.from(v).toString("base64");
      if (Array.isArray(v)) return Buffer.from(v).toString("base64");
      throw new Error("Cannot serialize value as Bytes");
    },
    parseValue: (v: unknown): Buffer => {
      if (typeof v === "string") return Buffer.from(v, "base64");
      if (Buffer.isBuffer(v)) return v;
      if (Array.isArray(v)) return Buffer.from(v);
      throw new Error("Cannot parse value as Bytes");
    },
    parseLiteral: (ast: StringValueNode): Buffer => {
      if (ast.kind === "StringValue") {
        return Buffer.from(ast.value, "base64");
      }
      throw new Error("Bytes literal not supported");
    },
  }),
  Query: {
    documents: () =>
      prisma.document.findMany({
        include: { owner: true, access: { include: { user: true } } },
      }),
    document: (_: any, { id }: { id: string }) =>
      prisma.document.findUnique({
        where: { id },
        include: { owner: true, access: { include: { user: true } } },
      }),
    myDocuments: async (_: any, __: any, context: any) => {
      const userId = await getSafeUserId(context);
      return prisma.document.findMany({
        where: { ownerId: userId }, // Documents YOU created
        include: { owner: true, access: { include: { user: true } } },
        orderBy: { updatedAt: "desc" },
      });
    },
    sharedDocuments: async (_: any, __: any, context: any) => {
      try {
        // 1. Get the User ID from context (throws error if not found)
        const userId = await getSafeUserId(context);

        // 2. Query Database
        const docs = await prisma.document.findMany({
          where: {
            access: {
              some: {
                userId: userId,
              },
            },
            NOT: {
              ownerId: userId,
            },
          },
          include: {
            owner: true,
            access: {
              include: { user: true },
            },
          },
          orderBy: { updatedAt: "desc" },
        });

        // 3. Return the list (fallback to empty array if null)
        return docs || [];
      } catch (error) {
        // 4. Log the error for you to see in the terminal
        console.error("❌ Shared documents fetch error:", error);

        // 5. Return empty list so the Frontend doesn't crash with "Cannot return null"
        return [];
      }
    },
  },
  Mutation: {
    createDocument: async (
      _: any,
      { title, type }: { title: string; type: string },
      context: any,
    ) => {
      const ownerId: string = await getSafeUserId(context);

      // Initialize a valid empty Yjs state to prevent "Unexpected end of array"
      const ydoc = new Y.Doc();
      const initialState = Y.encodeStateAsUpdate(ydoc);

      const doc = await prisma.document.create({
        data: {
          title,
          type,
          ownerId,
          content: Buffer.from(initialState),
          // This adds the ADMIN access record automatically
          access: {
            create: {
              userId: ownerId,
              permission: "ADMIN",
            },
          },
        },
        // Include owner and access so the frontend gets the data immediately
        include: {
          owner: true,
          access: {
            include: { user: true },
          },
        },
      });

      pubsub.publish("DOCUMENT_CREATED", { documentCreated: doc });
      return doc;
    },
    updateDocument: async (
      _: any,
      { id, title, content }: { id: string; title?: string; content?: string },
    ) => {
      const doc = await prisma.document.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(content && { content: Buffer.from(content) }),
        },
        include: { owner: true, access: { include: { user: true } } },
      });
      pubsub.publish("DOCUMENT_UPDATED", { documentUpdated: doc });
      return doc;
    },
    deleteDocument: async (_: any, { id }: { id: string }, context: any) => {
      const revokerId = await getSafeUserId(context);

      // 1. Fetch document and all collaborators before deleting
      const docToDelete = await prisma.document.findUnique({
        where: { id, ownerId: revokerId },
        include: {
          access: {
            include: { user: true },
          },
        },
      });

      if (!docToDelete) throw new Error("Document not found or unauthorized.");

      const docTitle = docToDelete.title;
      const owner = await prisma.user.findUnique({ where: { id: revokerId } });
      const userIdsToCheck = docToDelete.access.map((a) => a.userId);
      const emailsToNotify = docToDelete.access
        .map((a) => a.user.email)
        .filter(Boolean);

      // 2. Perform the deletion (Cascade will handle access records)
      await prisma.document.delete({
        where: { id },
      });

      // 3. Send emails to all collaborators
      // We do this in parallel so it doesn't slow down the response
      try {
        await Promise.all(
          emailsToNotify.map((email) =>
            sendRevocationEmail({
              to: email,
              documentTitle: docTitle,
              senderName: owner?.name || "The owner",
            }),
          ),
        );
      } catch (err) {
        console.error("Failed to send some deletion notifications:", err);
      }

      // 4. CLEANUP: Delete ghost users
      await Promise.all(
        userIdsToCheck.map(async (collabId) => {
          const [otherAccessCount, ownedDocsCount] = await Promise.all([
            prisma.documentAccess.count({ where: { userId: collabId } }),
            prisma.document.count({ where: { ownerId: collabId } }),
          ]);

          if (otherAccessCount === 0 && ownedDocsCount === 0) {
            console.log(`🧹 Cleaning up ghost user: ${collabId}`);
            try {
              await prisma.user.delete({ where: { id: collabId } });
            } catch (e) {
              console.error("Ghost cleanup failed for:", collabId);
            }
          }
        }),
      );

      return true;
    },
    shareDocument: async (
      _: any,
      {
        documentId,
        userId,
        permission,
      }: { documentId: string; userId: string; permission: string },
      context: any,
    ) => {
      let targetUserId = userId;
      let targetEmail = userId;

      // 1. If userId is an email, upsert user first
      if (userId.includes("@")) {
        const u = await prisma.user.upsert({
          where: { email: userId },
          update: {},
          create: {
            id: randomUUID(),
            email: userId,
            name: userId.split("@")[0],
            password: await bcrypt.hash("defaultPassword123", 10),
          },
        });
        targetUserId = u.id;
        targetEmail = u.email;
      }

      // 2. Fix Prisma Error: use 'userId' instead of 'userEmail'
      const access = await prisma.documentAccess.upsert({
        where: { userId_documentId: { userId: targetUserId, documentId } },
        update: { permission },
        create: {
          userId: targetUserId, // Ensure your schema uses userId
          documentId,
          permission,
        },
        include: {
          user: true,
          document: { include: { owner: true } },
        },
      });

      // 3. Trigger Email (using the name imported above)
      try {
        const senderId = context?.user?.id || context?.headers?.["x-user-id"];
        const sender = await prisma.user.findUnique({
          where: { id: senderId },
        });

        await sendInviteEmail({
          // Use the correct function name here
          to: targetEmail,
          documentTitle: access.document.title || "Untitled Document",
          permission: permission,
          senderName: sender?.name || "A collaborator",
        });
      } catch (emailErr) {
        console.error("❌ Email failed:", emailErr);
      }

      pubsub.publish("DOCUMENT_SHARED", { documentShared: access });
      return access;
    },
    revokeAccess: async (
      _: any,
      { documentId, userId }: { documentId: string; userId: string },
      context: any,
    ) => {
      // 1. Fetch data before deleting to send the email
      const accessRecord = await prisma.documentAccess.findUnique({
        where: { userId_documentId: { userId, documentId } },
        include: { user: true, document: true },
      });

      if (!accessRecord) throw new Error("Access record not found.");

      const targetEmail = accessRecord.user.email;
      const docTitle = accessRecord.document.title;

      // 2. Delete the specific access record (The primary action)
      await prisma.documentAccess.delete({
        where: { userId_documentId: { userId, documentId } },
      });

      // 3. Send the Revocation Email
      try {
        const revokerId = await getSafeUserId(context);
        const revoker = await prisma.user.findUnique({
          where: { id: revokerId },
        });

        await sendRevocationEmail({
          to: targetEmail,
          documentTitle: docTitle,
          senderName: revoker?.name || "The owner",
        });
      } catch (err) {
        console.error("Email notification failed:", err);
      }

      // 4. THE CLEANUP LOGIC
      // Check if the user has any OTHER reason to exist in the DB
      const [otherAccessCount, ownedDocsCount] = await Promise.all([
        prisma.documentAccess.count({
          where: { userId: userId },
        }),
        prisma.document.count({
          where: { ownerId: userId },
        }),
      ]);

      // If they have no other documents and no other access records, delete them
      if (otherAccessCount === 0 && ownedDocsCount === 0) {
        console.log(
          `🧹 Ghost user cleanup: Deleting ${targetEmail} from database.`,
        );
        await prisma.user.delete({
          where: { id: userId },
        });
      }

      return true;
    },
  },
  DocumentAccess: {
    id: (parent: any) => `${parent.userId}-${parent.documentId}`,
  },
  Subscription: {
    documentUpdated: {
      subscribe: (_: any, { documentId }: any) => {
        return (pubsub as any).asyncIterator(["DOCUMENT_UPDATED"]);
      },
      resolve: (payload: any, args: any) => {
        if (payload.documentUpdated?.id === args.documentId) {
          return payload.documentUpdated;
        }
        return undefined; // instead of null
      },
    },

    documentShared: {
      subscribe: (_: any, { documentId }: any) => {
        return (pubsub as any).asyncIterator(["DOCUMENT_SHARED"]);
      },
      resolve: (payload: any, args: any) => {
        if (payload.documentShared?.documentId === args.documentId) {
          return payload.documentShared;
        }
        return undefined; // instead of null
      },
    },

    activeUsers: {
      subscribe: (_: any, { documentId }: any) => {
        return (pubsub as any).asyncIterator(["ACTIVE_USERS"]);
      },
      resolve: (payload: any, args: any) => {
        if (payload.activeUsers?.documentId === args.documentId) {
          return payload.activeUsers.users;
        }
        return [];
      },
    },
  },
};
