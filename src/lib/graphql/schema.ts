import { parse } from "graphql";

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
    activeUsers(documentId: String!): [String!]!
  }

  scalar DateTime
`;

export const typeDefs = parse(schemaSDL);
