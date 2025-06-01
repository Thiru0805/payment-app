import mongoose from 'mongoose';
import { MONGO_URI } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
