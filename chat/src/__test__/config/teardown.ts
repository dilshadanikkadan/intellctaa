import mongoose from 'mongoose';

export default async function() {
  const mongo = (global as any).__MONGO_URI__;
  if (mongo) {
    await mongoose.disconnect();
    await mongo.stop();
  }
}