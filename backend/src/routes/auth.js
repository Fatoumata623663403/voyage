import express from "express";
import User from "../models/User.js"; // Assure-toi que le chemin est correct

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

  const user = new User({ firstName, lastName, email, password });
  await user.save();

  // Renvoie l'ID pour le frontend
  res.status(201).json({ message: "Utilisateur créé avec succès", userId: user._id });
});

export default router;
