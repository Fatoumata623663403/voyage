/*port express from "express";
import { createBooking, getBookings } from "../controllers/bookingController";

const router = express.Router();
router.post("/", createBooking);
router.get("/", getBookings);
export default router;
*/



import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';
import Booking from "../models/Booking.js"; 

const router = express.Router();
router.post('/', createBooking);
router.get("/:userId", getUserBookings);


// Créer une réservation
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer les réservations d’un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
