



// backend/src/controllers/bookingController.js
import Booking from "../models/Booking.js";

// Créer une réservation
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les réservations d’un utilisateur
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
