const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixNullContent() {
  try {
    // Find documents with null content
    const documentsWithNullContent = await prisma.document.findMany({
      where: {
        content: null
      }
    });

    console.log(`Found ${documentsWithNullContent.length} documents with null content`);

    // Update each document with empty buffer
    for (const doc of documentsWithNullContent) {
      await prisma.document.update({
        where: { id: doc.id },
        data: {
          content: Buffer.alloc(0) // Empty buffer
        }
      });
      console.log(`Fixed document: ${doc.id} - ${doc.title}`);
    }

    console.log('All null content documents fixed!');
  } catch (error) {
    console.error('Error fixing null content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNullContent();
