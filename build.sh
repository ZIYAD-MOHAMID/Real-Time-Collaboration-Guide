#!/bin/bash

# Make sure Prisma client is generated
npx prisma generate

# Use environment variables
export DATABASE_URL=$DATABASE_URL
export NEXTAUTH_URL=$NEXTAUTH_URL
export NEXTAUTH_SECRET=$NEXTAUTH_SECRET
export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
export WEBSOCKET_URL=$WEBSOCKET_URL

# Build Next.js app
npm run build
