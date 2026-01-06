# Collaborative Workspace

A high-performance, real-time collaborative digital workspace that seamlessly integrates capabilities for Planning, Drawing, and Writing within a single application.

## Features

- **Real-time Collaboration**: Instant editing with WebSockets and GraphQL Subscriptions
- **Conflict Resolution**: CRDTs (Yjs) for automatic merging of concurrent edits
- **Access Control**: Granular permission levels (VIEWER, EDITOR, ADMIN)
- **Document Types**: Support for planning, drawing, and writing documents
- **Export Functionality**: Export documents to various formats (JSON, CSV, Markdown, PNG)

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **API**: Next.js API Routes, GraphQL
- **Database**: Prisma, PostgreSQL
- **Real-time**: WebSockets, GraphQL Subscriptions
- **Collaboration**: Yjs CRDT
- **Authentication**: NextAuth
- **Infrastructure**: Docker / docker-compose

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the database:
   ```bash
   docker-compose up -d postgres
   ```

5. Run database migrations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using Docker

You can run the entire application using Docker Compose:

```bash
docker-compose up
```

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   └── graphql/       # GraphQL endpoint
│   ├── dashboard/         # Main dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── DocumentEditor.tsx # Main document editor
│   ├── DocumentList.tsx   # Document list sidebar
│   └── ShareDialog.tsx    # Share dialog component
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── crdt/             # CRDT provider
│   ├── export/           # Export utilities
│   ├── graphql/          # GraphQL schema and resolvers
│   ├── prisma.ts         # Prisma client
│   └── websocket/        # WebSocket server
└── types/                # TypeScript type definitions
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: Authentication and user profiles
- **Document**: Collaborative documents with CRDT data
- **DocumentAccess**: Permission management for document sharing

## Real-time Features

- **WebSocket Connections**: Persistent connections for real-time updates
- **CRDT Synchronization**: Conflict-free collaborative editing
- **User Awareness**: Show connected users and their cursors
- **Live Updates**: Instant propagation of changes

## Export Options

- **Writing Documents**: Markdown format
- **Drawing Documents**: PNG images
- **Planning Documents**: CSV/Excel compatible format
- **All Documents**: JSON format for backup

## Authentication

The application supports:
- Google OAuth
- Email/Password authentication
- Session management with NextAuth

## Development

### Running Tests

```bash
npm test
```

### Database Management

```bash
# View database
npm run db:studio

# Reset database
npm run db:reset

# Generate Prisma client
npm run db:generate
```

### Environment Variables

Key environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: NextAuth secret key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
