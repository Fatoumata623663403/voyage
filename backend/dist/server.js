import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import bookingRoutes from './routes/bookingRoutes';
import express from 'express';
import { getAccessToken, searchFlights } from './amandeusApi';
import authRoutes from "./routes/auth";
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

// CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Connexion DB
connectDB();

// Endpoint pour vols
app.get('/api/flights', async (req, res) => {
    try {
        const { origin, destination, departureDate } = req.query;
        if (!origin || !destination || !departureDate) {
            return res.status(400).json({ error: 'Veuillez fournir origin, destination et departureDate' });
        }
        const token = await getAccessToken();
        const flights = await searchFlights(token, origin, destination, departureDate);
        res.json(flights);
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'Erreur inconnue');
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
