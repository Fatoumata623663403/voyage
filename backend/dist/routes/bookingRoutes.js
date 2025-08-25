/*port express from "express";
import { createBooking, getBookings } from "../controllers/bookingController";

const router = express.Router();
router.post("/", createBooking);
router.get("/", getBookings);
export default router;
*/
import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController';


import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();
router.post('/', createBooking);
router.get('/', getBookings);

// Récupérer l'historique des réservations pour un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;




