import React, { useState } from 'react';
import { X, User, Mail, Phone, CreditCard, Calendar, MapPin, Plane, Building } from 'lucide-react';
import { Flight, Hotel, CarRental, Activity, Package, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Flight | Hotel | CarRental | Activity | Package | null;
  type: 'flight' | 'hotel' | 'car' | 'activity' | 'package';
  onConfirmBooking?: (booking: Booking) => void;
  userId: string; // 👈 Ajouté ici
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  item,
  type,
  onConfirmBooking,
  userId
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    passengers: 1,
    specialRequests: ''
  });
  const [step, setStep] = useState(1);
  if (!isOpen || !item) return null;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRandomCode = () => `CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const calculateTotalPrice = () => {
    const basePrice = (item as any).price || 0;
    return type === 'flight' ? basePrice * formData.passengers : basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const booking: Booking = {
      _id: `${Date.now()}`,
      userId: userId, // 👈 Utilise le userId passé en prop
      type,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      details: item,
      passengers: Array.from({ length: formData.passengers }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        type: 'adult',
        title: 'M.',
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: 30,
        dateOfBirth: '1990-01-01',
        nationality: 'Française'
      })),
      totalPrice: calculateTotalPrice(),
      travelDate: new Date().toISOString(),
      currency: 'EUR',
      paymentMethod: 'Credit Card',
      confirmationNumber: generateRandomCode()
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      console.log("✅ Réservation créée :", data);
      onConfirmBooking?.(booking);
      onClose();
      setStep(1);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        passengers: 1,
        specialRequests: ''
      });
    } catch (err) {
      console.error("❌ Erreur lors de la réservation :", err);
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* En‑tête */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Réservation {type === 'flight' ? 'Vol' : 'Hôtel'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Résumé */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-3">
              {type === 'flight' ? (
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
              ) : (
                <Building className="w-5 h-5 text-green-600 mr-2" />
              )}
              <h3 className="font-semibold text-gray-900">
                {type === 'flight' ? (item as Flight).airline : (item as Hotel).name}
              </h3>
            </div>
            {type === 'flight' ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Départ</p>
                  <p className="font-medium">{(item as Flight).departure.city} – {(item as Flight).departure.time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Arrivée</p>
                  <p className="font-medium">{(item as Flight).arrival.city} – {(item as Flight).arrival.time}</p>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <MapPin className="w-4 h-4 mr-1 text-gray-600 inline" />
                <span className="text-gray-600">{(item as Hotel).location}</span>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Infos passager */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['firstName', 'lastName'].map((f, idx) => (
                    <div key={`${f}-${idx}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {f === 'firstName' ? 'Prénom' : 'Nom'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={(formData as any)[f]}
                          onChange={(e) => handleInputChange(f, e.target.value)}
                          placeholder={f === 'firstName' ? 'Votre prénom' : 'Votre nom'}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email et Téléphone */}
                {['email', 'phone'].map((f, idx) => (
                  <div key={`${f}-${idx}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {f === 'email' ? 'Email' : 'Téléphone'}
                    </label>
                    <div className="relative">
                      {f === 'email' ? <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" /> : <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
                      <input
                        type={f === 'email' ? 'email' : 'tel'}
                        required
                        value={(formData as any)[f]}
                        onChange={(e) => handleInputChange(f, e.target.value)}
                        placeholder={f === 'email' ? 'votre@email.com' : '06 12 34 56 78'}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}

                {/* Nombre de passagers */}
                {type === 'flight' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de passagers
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} passager{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Continuer
                </button>
              </>
            ) : (
              <>
                {/* Paiement */}
                {/* ... même que le tien ... */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Confirmer la réservation
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
