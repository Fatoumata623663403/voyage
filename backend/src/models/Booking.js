// backend/src/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Infos utilisateur
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },

    // Paiement
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },

    // Détails réservation
    type: { type: String, enum: ["flight", "hotel", "car", "activity"], required: true },
    status: { type: String, enum: ["confirmed", "pending", "cancelled"], default: "pending" },
    bookingDate: { type: Date, default: Date.now },
    totalPrice: { type: Number },
    passengers: { type: Number },
    date: { type: Date },
    destination: { type: String },
    itemId: { type: String },

    details: {
      type: mongoose.Schema.Types.Mixed, // pour stocker des champs dynamiques
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
