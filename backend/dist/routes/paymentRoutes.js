// backend/src/routes/paymentRoutes.ts
import express from 'express';
import { initiateOrangePayment, handlePaymentCallback } from '../controllers/orangeMoneyController';
const router = express.Router();
// Initier le paiement
router.post('/pay', initiateOrangePayment);
// Réception du callback Orange
router.post('/payment-callback', handlePaymentCallback);
export default router;
