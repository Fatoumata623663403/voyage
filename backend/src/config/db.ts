/*port mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur MongoDB:", err);
    process.exit(1);
  }
};*/


import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Connexion MongoDB échouée:', error);
    process.exit(1);
  }
};

export default connectDB;
