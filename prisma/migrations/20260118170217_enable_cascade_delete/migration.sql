-- DropForeignKey
ALTER TABLE "DocumentAccess" DROP CONSTRAINT "DocumentAccess_documentId_fkey";

-- AddForeignKey
ALTER TABLE "DocumentAccess" ADD CONSTRAINT "DocumentAccess_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
