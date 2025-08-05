/*port express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import bookingRoutes from "./routes/bookingRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);


app.get("/", (req, res) => {
  res.send("API en ligne");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur sur http://localhost:${process.env.PORT}`);
});
*/




import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});


