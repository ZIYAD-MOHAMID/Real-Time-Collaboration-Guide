/*
  Warnings:

  - The primary key for the `DocumentAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `grantedAt` on the `DocumentAccess` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `DocumentAccess` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Changed the type of `permission` on the `DocumentAccess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentAccess" DROP CONSTRAINT "DocumentAccess_documentId_fkey";

-- DropIndex
DROP INDEX "DocumentAccess_userId_documentId_key";

-- AlterTable
ALTER TABLE "DocumentAccess" DROP CONSTRAINT "DocumentAccess_pkey",
DROP COLUMN "grantedAt",
DROP COLUMN "id",
DROP COLUMN "permission",
ADD COLUMN     "permission" TEXT NOT NULL,
ADD CONSTRAINT "DocumentAccess_pkey" PRIMARY KEY ("userId", "documentId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "image",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentAccess" ADD CONSTRAINT "DocumentAccess_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
