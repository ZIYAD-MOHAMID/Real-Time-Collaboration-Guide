import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data in correct order to handle foreign key constraints
  await prisma.documentAccess.deleteMany();
  await prisma.document.deleteMany();
  await prisma.user.deleteMany({
    where: { email: "test@example.com" },
  });

  // Create a test user with the specific ID expected by GraphQL resolvers
  // const hashedPassword = await bcrypt.hash('password123', 12);

  // const user = await prisma.user.create({
  //   data: {
  //     id: 'seed-user-1',
  //     email: 'test@example.com',
  //     name: 'Test User',
  //     password: hashedPassword,
  //   },
  // });

  // console.log('Seed user created:', user);

  // // Create sample documents
  // const documents = await Promise.all([
  //   prisma.document.create({
  //     data: {
  //       id: "doc-1",
  //       title: "Sample Planning Document",
  //       type: "planning",
  //       ownerId: user.id,
  //     },
  //   }),
  //   prisma.document.create({
  //     data: {
  //       id: "doc-2",
  //       title: "Sample Drawing Document",
  //       type: "drawing",
  //       ownerId: user.id,
  //     },
  //   }),
  //   prisma.document.create({
  //     data: {
  //       id: "doc-3",
  //       title: "Sample Writing Document",
  //       type: "writing",
  //       ownerId: user.id,
  //     },
  //   }),
  // ]);

  // console.log("Sample documents created:", documents);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
