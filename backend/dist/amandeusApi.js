import axios from 'axios';
const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;
let accessToken = '';
export async function getAccessToken() {
    if (accessToken)
        return accessToken;
    try {
        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: AMADEUS_CLIENT_ID || '',
            client_secret: AMADEUS_CLIENT_SECRET || '',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        accessToken = response.data.access_token;
        return response.data.access_token;
    }
    catch (error) {
        console.error('Erreur récupération token Amadeus', error);
        throw error;
    }
}
export async function searchFlights(token, origin, destination, departureDate) {
    try {
        const token = await getAccessToken();
        const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            params: {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: departureDate, // format: 'YYYY-MM-DD'
                adults: 1,
                max: 10,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Erreur recherche vols Amadeus', error);
        throw error;
    }
}
