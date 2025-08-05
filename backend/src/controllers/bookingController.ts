/*port { Request, Response } from 'express';
import { Booking } from '../models/Booking';

// Créer une réservation
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
};

// Lister toutes les réservations
export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};
*/


import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réservation", error });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};
