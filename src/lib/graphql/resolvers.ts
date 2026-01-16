import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { GraphQLScalarType, StringValueNode } from "graphql";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const pubsub = new PubSub();

const getSafeUserId = async (context: any) => {
  if (context?.user?.id) return context.user.id;

  const user = await prisma.user.findUnique({
    where: { id: "seed-user-1" },
  });

  if (!user) throw new Error("Seed user missing. Run DB seed.");

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
      const ownerId = await getSafeUserId(context);
      return prisma.document.findMany({
        where: { ownerId },
        include: { owner: true, access: { include: { user: true } } },
        orderBy: { updatedAt: "desc" },
      });
    },

    sharedDocuments: async (_: any, __: any, context: any) => {
      const userId = await getSafeUserId(context);
      return prisma.document.findMany({
        where: { access: { some: { userId } } },
        include: { owner: true, access: { include: { user: true } } },
      });
    },
  },

  Mutation: {
    createDocument: async (
      _: any,
      { title, type }: { title: string; type: string },
      context: any
    ) => {
      const ownerId: string = await getSafeUserId(context);
      const doc = await prisma.document.create({
        data: { title, type, ownerId },
        include: { owner: true, access: { include: { user: true } } },
      });
      pubsub.publish("DOCUMENT_CREATED", { documentCreated: doc });
      return doc;
    },

    updateDocument: async (
      _: any,
      { id, title, content }: { id: string; title?: string; content?: string }
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

    deleteDocument: async (_: any, { id }: { id: string }) => {
      await prisma.document.delete({ where: { id } });
      return true;
    },

    shareDocument: async (
      _: any,
      {
        documentId,
        userId,
        permission,
      }: { documentId: string; userId: string; permission: string }
    ) => {
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
        userId = u.id;
      }

      const access = await prisma.documentAccess.upsert({
        where: { userId_documentId: { userId, documentId } },
        update: { permission },
        create: { userId, documentId, permission },
        include: { user: true, document: { include: { owner: true } } },
      });

      pubsub.publish("DOCUMENT_SHARED", { documentShared: access });
      return access;
    },

    revokeAccess: async (
      _: any,
      { documentId, userId }: { documentId: string; userId: string }
    ) => {
      await prisma.documentAccess.delete({
        where: { userId_documentId: { userId, documentId } },
      });
      return true;
    },
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
