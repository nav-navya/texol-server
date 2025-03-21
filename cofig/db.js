import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, );
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
