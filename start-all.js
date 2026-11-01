const { spawn } = require('child_process');
const path = require('path');
const { MongoMemoryServer } = require('./p13/backend/node_modules/mongodb-memory-server');
const mongoose = require('./p13/backend/node_modules/mongoose');

async function main() {
  console.log('====================================================');
  console.log('🚀 Starting Full AWDF Task Manager Project (P13)...');
  console.log('====================================================');

  // 1. Start MongoDB in-memory instance
  console.log('\n[1/3] Initializing MongoDB on port 27017...');
  let mongod;
  try {
    mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'task_manager_db'
      }
    });
    console.log('✅ MongoDB connected and ready on port 27017!');
  } catch (err) {
    if (err.message && err.message.includes('Port 27017 already in use')) {
      console.log('ℹ️ Existing MongoDB instance detected on port 27017.');
    } else {
      console.warn('⚠️ MongoDB notice:', err.message);
    }
  }

  // 2. Seed database with initial sample tasks
  try {
    const Task = require('./p13/backend/models/Task');
    const User = require('./p13/backend/models/User');
    const bcrypt = require('./p13/backend/node_modules/bcryptjs');

    await mongoose.connect('mongodb://localhost:27017/task_manager_db');
    const taskCount = await Task.countDocuments();
    if (taskCount === 0) {
      console.log('🌱 Seeding initial sample tasks and demo user...');
      const sampleTasks = [
        {
          title: 'Complete Practical 5',
          description: 'Integrate MongoDB with Express and Mongoose schema validation',
          priority: 'high',
          completed: true
        },
        {
          title: 'Submit AWDF Lab Report',
          description: 'Prepare complete laboratory report with screenshots and architecture diagrams',
          priority: 'medium',
          completed: false
        },
        {
          title: 'Prepare for Faculty Viva',
          description: 'Review Docker multi-stage builds, JWT authentication, and AI Graceful Degradation',
          priority: 'low',
          completed: false
        }
      ];
      await Task.insertMany(sampleTasks);

      const existingUser = await User.findOne({ email: 'demo@faculty.com' });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({ email: 'demo@faculty.com', password: hashedPassword });
      }
      console.log('✅ Initial demo data seeded successfully!');
      console.log('   Demo Login: demo@faculty.com | Password: password123');
    } else {
      console.log(`ℹ️ Database already has ${taskCount} tasks.`);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.warn('⚠️ Seeding note:', err.message);
  }

  // 3. Start Backend Server
  console.log('\n[2/3] Starting Backend Server (Port 5001)...');
  const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'p13/backend'),
    stdio: 'inherit',
    env: { ...process.env, PORT: '5001', NODE_ENV: 'development' }
  });

  // 4. Start Frontend Server
  console.log('\n[3/3] Starting Frontend Dev Server (Port 5173)...');
  const frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
    cwd: path.join(__dirname, 'p13/frontend'),
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('\n====================================================');
  console.log('🎉 Project is LIVE!');
  console.log('👉 Frontend URL: http://localhost:5173');
  console.log('👉 Backend API:  http://localhost:5001');
  console.log('👉 Demo Account: demo@faculty.com / password123');
  console.log('====================================================\n');

  const cleanShutdown = async () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    if (mongod) await mongod.stop();
    process.exit(0);
  };

  process.on('SIGINT', cleanShutdown);
  process.on('SIGTERM', cleanShutdown);
}

main().catch(console.error);

