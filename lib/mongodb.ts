import mongoose from 'mongoose';

// Using encodeURIComponent for the password to handle special characters
const username = 'checker';
const password = encodeURIComponent('checker');
const MONGODB_URI = `mongodb+srv://${username}:${password}@ctfblogs.n87ajos.mongodb.net/ctf-blog?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 30000,
      retryWrites: true,
      retryReads: true,
      ssl: true,
      tls: true
    };

    mongoose.set('strictQuery', true);

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB successfully');
      return mongoose;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      if (error.message.includes('bad auth')) {
        console.error('Authentication failed. Please check:');
        console.error('1. Username and password are correct');
        console.error('2. User has proper permissions in MongoDB Atlas');
        console.error('3. IP address is whitelisted in MongoDB Atlas');
        console.error('4. Database name is correct');
      } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
        console.error('Connection failed. Please check:');
        console.error('1. Your IP address is whitelisted in MongoDB Atlas');
        console.error('2. Network connectivity is stable');
        console.error('3. MongoDB Atlas cluster is running');
      }
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;