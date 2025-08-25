// backend/src/controllers/orangeMoneyController.ts
import axios from 'axios';
// ⚠️ Remplace par tes vraies infos API
const CLIENT_ID = process.env.ORANGE_CLIENT_ID;
const CLIENT_SECRET = process.env.ORANGE_CLIENT_SECRET;
const RETURN_URL = 'https://tonsite.com/payment-success';
const CANCEL_URL = 'https://tonsite.com/payment-cancel';
const NOTIF_URL = 'https://tonsite.com/api/payment-callback';
const getAccessToken = async () => {
    const response = await axios.post('https://api.orange.com/oauth/v3/token', 'grant_type=client_credentials', {
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const data = response.data;
    return data.access_token;
};
export const initiateOrangePayment = async (req, res) => {
    try {
        const { amount, orderId } = req.body;
        const token = await getAccessToken();
        const response = await axios.post('https://api.orange.com/orange-money-webpay/gn/v1/webpayment', {
            amount,
            currency: 'GNF',
            order_id: orderId,
            return_url: RETURN_URL,
            cancel_url: CANCEL_URL,
            notif_url: NOTIF_URL,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;
        res.status(200).json({ paymentUrl: data.payment_url });
    }
    catch (error) {
        console.error('Erreur Orange Money :', error);
        res.status(500).json({ message: 'Erreur lors du paiement Orange Money' });
    }
};
export const handlePaymentCallback = (req, res) => {
    const data = req.body;
    console.log('Notification de paiement reçue :', data);
    // ⚠️ Ici tu dois traiter et stocker le statut du paiement
    res.sendStatus(200);
};
