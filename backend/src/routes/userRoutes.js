// backend/src/routes/userRoutes.js
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// GET /api/users/:userId/bookings
router.get("/:userId/bookings", async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
