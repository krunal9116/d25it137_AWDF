const { MongoMemoryServer } = require('mongodb-memory-server');

async function start() {
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'task_manager_db'
      }
    });
    console.log(`[MongoMemoryServer] MongoDB running successfully at: ${mongod.getUri()} (Port 27017)`);

    const handleExit = async () => {
      console.log('Stopping MongoMemoryServer...');
      await mongod.stop();
      process.exit(0);
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  } catch (err) {
    console.error('[MongoMemoryServer] Error starting in-memory MongoDB:', err);
    process.exit(1);
  }
}

start();

