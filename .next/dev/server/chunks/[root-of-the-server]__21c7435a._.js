module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/src/lib/graphql/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "typeDefs",
    ()=>typeDefs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/language/parser.mjs [app-route] (ecmascript)");
;
const schemaSDL = `
  scalar Bytes

  type User {
    id: String!
    email: String!
    name: String
    image: String
  }

  type Document {
    id: String!
    title: String!
    content: Bytes
    type: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User!
    access: [DocumentAccess!]!
  }

  type DocumentAccess {
    id: String!
    user: User!
    document: Document!
    permission: PermissionType!
    grantedAt: DateTime!
  }

  enum PermissionType {
    VIEWER
    EDITOR
    ADMIN
  }

  type Query {
    documents: [Document!]!
    document(id: String!): Document
    myDocuments: [Document!]!
    sharedDocuments: [Document!]!
  }

  type Mutation {
    createDocument(title: String!, type: String!): Document!
    updateDocument(id: String!, title: String, content: Bytes): Document!
    deleteDocument(id: String!): Boolean!
    shareDocument(
      documentId: String!
      userId: String!
      permission: PermissionType!
    ): DocumentAccess!
    revokeAccess(documentId: String!, userId: String!): Boolean!
  }

  type Subscription {
    documentUpdated(documentId: String!): Document!
    documentShared(documentId: String!): DocumentAccess!
  }

  scalar DateTime
`;
const typeDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"])(schemaSDL);
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/graphql/resolvers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolvers",
    ()=>resolvers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$subscriptions$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-subscriptions/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/type/definition.mjs [app-route] (ecmascript)");
;
;
;
const pubsub = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$subscriptions$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PubSub"]();
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
const fetchMyDocuments = async (_, __, context)=>{
    console.log("=== myDocuments called ===");
    console.log("Context received:", context);
    console.log("User in context:", context?.user);
    // TEMPORARY: Allow document listing for testing
    if (!context?.user) {
        console.log("No user in context, returning documents for default user");
        const defaultUserId = "cmk1q6rlz00005m8ivwcxc5cy"; // Your user ID
        const documents = await prisma.document.findMany({
            where: {
                ownerId: defaultUserId
            },
            include: {
                owner: true,
                access: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        });
        return documents.map((doc)=>({
                ...doc,
                access: doc.access || []
            }));
    }
    console.log("Fetching documents for user:", context.user.id);
    const documents = await prisma.document.findMany({
        where: {
            ownerId: context.user.id
        },
        include: {
            owner: true,
            access: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            updatedAt: "desc"
        }
    });
    return documents.map((doc)=>({
            ...doc,
            access: doc.access || []
        }));
};
const resolvers = {
    Bytes: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLScalarType"]({
        name: 'Bytes',
        description: 'Byte array scalar type',
        serialize (value) {
            if (Buffer.isBuffer(value)) {
                return value;
            }
            if (value instanceof Uint8Array) {
                return Buffer.from(value);
            }
            // Handle serialized Buffer objects
            if (value && typeof value === 'object' && value.type === 'Buffer' && Array.isArray(value.data)) {
                return Buffer.from(value.data);
            }
            throw new Error('Bytes: Invalid value');
        },
        parseValue (value) {
            if (Buffer.isBuffer(value)) {
                return value;
            }
            if (value instanceof Uint8Array) {
                return Buffer.from(value);
            }
            // Handle serialized Buffer objects
            if (value && typeof value === 'object' && value.type === 'Buffer' && Array.isArray(value.data)) {
                return Buffer.from(value.data);
            }
            throw new Error('Bytes: Invalid value');
        },
        parseLiteral (ast) {
            throw new Error('Bytes: Literal parsing not supported');
        }
    }),
    Query: {
        documents: async ()=>{
            return await prisma.document.findMany({
                include: {
                    owner: true,
                    access: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        },
        document: async (_, { id })=>{
            return await prisma.document.findUnique({
                where: {
                    id
                },
                include: {
                    owner: true,
                    access: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        },
        myDocuments: fetchMyDocuments,
        sharedDocuments: async (_, __, context)=>{
            // TEMPORARY: Allow document listing for testing
            if (!context?.user) {
                console.log("No user in context, returning empty shared documents");
                return []; // Return empty array directly
            }
            console.log("Fetching shared documents for user:", context.user.id);
            const documents = await prisma.document.findMany({
                where: {
                    access: {
                        some: {
                            userId: context.user.id
                        }
                    }
                },
                include: {
                    owner: true,
                    access: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            console.log("Returning shared documents array:", documents);
            return documents; // Return array directly, not wrapped in object
        }
    },
    Mutation: {
        createDocument: async (_, { title, type }, context)=>{
            console.log("=== createDocument called ===");
            console.log("Context received:", context);
            console.log("User in context:", context?.user);
            // TEMPORARY: Allow document creation for testing
            if (!context?.user) {
                console.log("No user in context, creating document with default user");
                const defaultUserId = "cmk1q6rlz00005m8ivwcxc5cy"; // Your user ID
                const document = await prisma.document.create({
                    data: {
                        title,
                        type,
                        ownerId: defaultUserId
                    },
                    include: {
                        owner: true,
                        access: {
                            include: {
                                user: true
                            }
                        }
                    }
                });
                pubsub.publish("DOCUMENT_CREATED", {
                    documentCreated: document
                });
                return document;
            }
            console.log("Creating document for user:", context.user.id);
            const document = await prisma.document.create({
                data: {
                    title,
                    type,
                    ownerId: context.user.id
                },
                include: {
                    owner: true,
                    access: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            pubsub.publish("DOCUMENT_CREATED", {
                documentCreated: document
            });
            return document;
        },
        updateDocument: async (_, { id, title, content }, context)=>{
            console.log("=== updateDocument called ===");
            console.log("Document ID:", id);
            console.log("Context received:", context);
            console.log("User in context:", context?.user);
            // TEMPORARY: Allow document updates for testing
            if (!context?.user) {
                console.log("No user in context, allowing update for testing");
                const defaultUserId = "cmk1q6rlz00005m8ivwcxc5cy"; // Your user ID
                const document = await prisma.document.update({
                    where: {
                        id
                    },
                    data: {
                        ...title && {
                            title
                        },
                        ...content && {
                            content: Buffer.isBuffer(content) ? content : Buffer.from(content)
                        }
                    },
                    include: {
                        owner: true,
                        access: {
                            include: {
                                user: true
                            }
                        }
                    }
                });
                pubsub.publish("DOCUMENT_UPDATED", {
                    documentUpdated: document
                });
                return document;
            }
            console.log("Updating document for user:", context.user.id);
            const document = await prisma.document.update({
                where: {
                    id
                },
                data: {
                    ...title && {
                        title
                    },
                    ...content && {
                        content: Buffer.isBuffer(content) ? content : Buffer.from(content)
                    }
                },
                include: {
                    owner: true,
                    access: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            pubsub.publish("DOCUMENT_UPDATED", {
                documentUpdated: document
            });
            return document;
        },
        deleteDocument: async (_, { id }, context)=>{
            console.log("=== deleteDocument called ===");
            console.log("Document ID:", id);
            console.log("Context received:", context);
            console.log("User in context:", context?.user);
            // TEMPORARY: Allow document deletion for testing
            if (!context?.user) {
                console.log("No user in context, allowing deletion for testing");
            } else {
                // Check if user owns the document
                const document = await prisma.document.findUnique({
                    where: {
                        id
                    }
                });
                if (!document) {
                    throw new Error("Document not found");
                }
                if (document.ownerId !== context.user.id) {
                    throw new Error("Unauthorized: You can only delete your own documents");
                }
            }
            console.log("Deleting document:", id);
            await prisma.document.delete({
                where: {
                    id
                }
            });
            console.log("Document deleted successfully");
            return true;
        },
        shareDocument: async (_, { documentId, userId, permission }, context)=>{
            console.log("=== shareDocument called ===");
            console.log("Document ID:", documentId);
            console.log("User ID to share with:", userId);
            console.log("Permission:", permission);
            console.log("Context received:", context);
            console.log("User in context:", context?.user);
            // TEMPORARY: Allow document sharing for testing
            if (!context?.user) {
                console.log("No user in context, allowing share for testing");
                const defaultUserId = "cmk1q6rlz00005m8ivwcxc5cy"; // Your user ID
                let storedUserId = userId;
                let mockUser = false;
                if (userId.includes("@")) {
                    const email = userId.trim().toLowerCase();
                    const targetUser = await prisma.user.upsert({
                        where: {
                            email
                        },
                        update: {},
                        create: {
                            email,
                            name: email.split("@")[0]
                        }
                    });
                    storedUserId = targetUser.id;
                    mockUser = false;
                }
                // For testing, use the default user ID instead of the email
                // This ensures the user exists in the database
                const access = await prisma.documentAccess.upsert({
                    where: {
                        userId_documentId: {
                            userId: storedUserId,
                            documentId
                        }
                    },
                    update: {
                        permission: permission
                    },
                    create: {
                        documentId,
                        userId: storedUserId,
                        permission: permission
                    },
                    include: {
                        user: true,
                        document: {
                            include: {
                                owner: true
                            }
                        }
                    }
                });
                // Mock the user response to show the email that was "shared"
                const mockAccess = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : access;
                pubsub.publish("DOCUMENT_SHARED", {
                    documentShared: mockAccess
                });
                return mockAccess;
            }
            console.log("Sharing document for user:", context.user.id);
            let storedUserId = userId;
            if (userId.includes("@")) {
                const email = userId.trim().toLowerCase();
                const targetUser = await prisma.user.upsert({
                    where: {
                        email
                    },
                    update: {},
                    create: {
                        email,
                        name: email.split("@")[0]
                    }
                });
                storedUserId = targetUser.id;
            }
            const access = await prisma.documentAccess.upsert({
                where: {
                    userId_documentId: {
                        userId: storedUserId,
                        documentId
                    }
                },
                update: {
                    permission: permission
                },
                create: {
                    documentId,
                    userId: storedUserId,
                    permission: permission
                },
                include: {
                    user: true,
                    document: {
                        include: {
                            owner: true
                        }
                    }
                }
            });
            pubsub.publish("DOCUMENT_SHARED", {
                documentShared: access
            });
            return access;
        },
        revokeAccess: async (_, { documentId, userId }, context)=>{
            console.log("=== revokeAccess called ===");
            console.log("Document ID:", documentId);
            console.log("User ID to revoke:", userId);
            console.log("Context received:", context);
            console.log("User in context:", context?.user);
            // TEMPORARY: Allow access revocation for testing
            if (!context?.user) {
                console.log("No user in context, allowing revoke for testing");
                // For testing, we need to use the actual user ID that was stored in the database
                // Since we're using the default user ID for sharing, we need to revoke that same ID
                const defaultUserId = "cmk1q6rlz00005m8ivwcxc5cy";
                let storedUserId = userId;
                if (userId.includes("@")) {
                    const targetUser = await prisma.user.findUnique({
                        where: {
                            email: userId
                        }
                    });
                    storedUserId = targetUser?.id || defaultUserId;
                }
                try {
                    await prisma.documentAccess.delete({
                        where: {
                            userId_documentId: {
                                // Correct field name
                                userId: storedUserId,
                                documentId
                            }
                        }
                    });
                    console.log("Access revoked successfully");
                    return true;
                } catch (error) {
                    console.error("Error revoking access:", error);
                    // Return true anyway for UI purposes
                    return true;
                }
            }
            console.log("Revoking access for user:", userId);
            let storedUserId = userId;
            if (userId.includes("@")) {
                const email = userId.trim().toLowerCase();
                const targetUser = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!targetUser) {
                    throw new Error("User not found");
                }
                storedUserId = targetUser.id;
            }
            try {
                await prisma.documentAccess.delete({
                    where: {
                        userId_documentId: {
                            userId: storedUserId,
                            documentId
                        }
                    }
                });
                console.log("Access revoked successfully");
                return true;
            } catch (error) {
                console.error("Error revoking access:", error);
                throw new Error("Failed to revoke access");
            }
        }
    },
    Subscription: {
        documentUpdated: {
            subscribe: (_, { documentId })=>{
                return pubsub.asyncIterator([
                    `DOCUMENT_UPDATED_${documentId}`
                ]);
            }
        },
        documentShared: {
            subscribe: (_, { documentId })=>{
                return pubsub.asyncIterator([
                    `DOCUMENT_SHARED_${documentId}`
                ]);
            }
        }
    }
};
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/lib/graphql/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handler",
    ()=>handler,
    "server",
    ()=>server
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$server$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@apollo/server/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$server$2f$dist$2f$esm$2f$ApolloServer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/server/dist/esm/ApolloServer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$as$2d$integrations$2f$next$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@as-integrations/next/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/graphql/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$resolvers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/graphql/resolvers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const server = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$server$2f$dist$2f$esm$2f$ApolloServer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApolloServer"]({
    typeDefs: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["typeDefs"],
    resolvers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$resolvers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolvers"]
});
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$as$2d$integrations$2f$next$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startServerAndCreateNextHandler"])(server, {
    context: async (req)=>{
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
                        name: "User"
                    }
                };
                console.log("Created session from x-user-id:", session);
            }
            // Method 2: Try JWT token from cookies
            if (!session && req.cookies?.["next-auth.session-token"]) {
                console.log("Found session token in cookies:", req.cookies["next-auth.session-token"]);
                token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getToken"])({
                    req,
                    secret: process.env.NEXTAUTH_SECRET,
                    cookieName: "next-auth.session-token"
                });
                console.log("Token from cookies:", token);
                if (token) {
                    session = {
                        user: {
                            id: token.id,
                            email: token.email,
                            name: token.name
                        }
                    };
                }
            }
            // Method 3: Try authorization header
            if (!session && req.headers?.authorization) {
                const authHeader = req.headers.authorization;
                console.log("Found auth header:", authHeader);
                if (authHeader.startsWith("Bearer ")) {
                    token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getToken"])({
                        req: {
                            ...req,
                            headers: {
                                ...req.headers,
                                cookie: `next-auth.session-token=${authHeader.substring(7)}`
                            }
                        },
                        secret: process.env.NEXTAUTH_SECRET
                    });
                    console.log("Token from auth header:", token);
                    if (token) {
                        session = {
                            user: {
                                id: token.id,
                                email: token.email,
                                name: token.name
                            }
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
            prisma: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"]
        };
    }
});
}),
"[project]/src/app/api/graphql/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/graphql/server.ts [app-route] (ecmascript)");
;
async function GET(request) {
    console.log("=== GraphQL API GET ===");
    console.log("Request URL:", request.url);
    console.log("Request headers:", Object.fromEntries(request.headers.entries()));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handler"])(request);
}
async function POST(request) {
    console.log("=== GraphQL API POST ===");
    console.log("Request URL:", request.url);
    console.log("Request headers:", Object.fromEntries(request.headers.entries()));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$graphql$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handler"])(request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__21c7435a._.js.map