import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Récupérer toutes les réservations d'un utilisateur
router.get("/:userId/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
