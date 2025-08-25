import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // .js car on est en JS
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/auth.js";
import { getAccessToken, searchFlights } from "./amandeusApi.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes principales
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connexion à la base MongoDB
(async () => {
  try {
    await connectDB();
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Impossible de se connecter à MongoDB :", error);
    process.exit(1);
  }
})();

// Endpoint recherche de vols
app.get("/api/flights", async (req, res) => {
  try {
    const { origin, destination, departureDate } = req.query;

    if (!origin || !destination || !departureDate) {
      return res
        .status(400)
        .json({ error: "Veuillez fournir origin, destination et departureDate" });
    }

    const token = await getAccessToken();
    const flights = await searchFlights(
      token,
      origin,
      destination,
      departureDate
    );

    return res.json(flights);
  } catch (error) {
    console.error("❌ Erreur recherche vols :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// Lancement du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
