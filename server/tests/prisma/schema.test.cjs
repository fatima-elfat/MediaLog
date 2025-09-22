const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Create a new client (user)
    console.log('1. Creating a new client...');
    const newClient = await prisma.client.create({
      data: {
        email: `test_user_${Date.now()}@example.com`,
        name: 'Test Client',
      },
    });
    console.log('New client created:', newClient);

    // 2. Create a new media log for the client
    console.log('\n2. Creating a new media log for the client...');
    const newMediaLog = await prisma.mediaLog.create({
      data: {
        title: 'The Lord of the Rings',
        mediaType: 'BOOK',
        status: 'IN_PROGRESS',
        notes: 'Currently on chapter 5 of The Fellowship of the Ring.',
        clientId: newClient.id,
      },
    });
    console.log('New media log created:', newMediaLog);

    // 3. Read the created media log
    console.log('\n3. Reading the created media log...');
    const foundLog = await prisma.mediaLog.findUnique({
      where: {
        id: newMediaLog.id,
      },
      include: {
        client: true, // Include the associated client data      
        },
    });
    console.log('Found media log:', foundLog);

    // 4. Update the media log's status
    console.log('\n4. Updating the media log...');
    const updatedLog = await prisma.mediaLog.update({
      where: {
        id: newMediaLog.id,
      },
      data: {
        status: 'COMPLETED',
        notes: 'Finished the entire trilogy. An epic journey!',
      },
    });
    console.log('Updated media log:', updatedLog);

    // 5. Delete the media log
    console.log('\n5. Deleting the media log...');
    await prisma.mediaLog.delete({
      where: {
        id: updatedLog.id,
      },
    });
    console.log('Media log deleted successfully.');

    // 6. Delete the client
    console.log('\n6. Deleting the client...');
    await prisma.client.delete({
      where: {
        id: newClient.id,
      },
    });
    console.log('Client deleted successfully.');

    console.log('\nAll operations completed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\nPrisma client disconnected.');
  }
}

main();