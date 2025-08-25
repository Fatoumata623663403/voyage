import React, { useState } from 'react';
import { X, User, Mail, Phone, CreditCard, Calendar, MapPin, Plane, Building } from 'lucide-react';
import { Flight, Hotel, CarRental, Activity, Package, Booking } from '../types';
import PaymentModal from './PaymentModal';


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item:  Flight | Hotel | CarRental | Activity | Package | null;
  type: "flight" | "hotel" | "car" | "activity" | "package";
  onConfirmBooking: (booking: Booking) => void;
  userId?: string; // 👈 Ajouté ici
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  item, 
  type, 
  onConfirmBooking 
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking: Booking = {
      id: Date.now().toString(),
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
        dateOfBirth: '1984-01-01',
        nationality: 'Française'
      })),
      totalPrice: calculateTotalPrice(),
      travelDate: new Date().toISOString(),
      currency: 'EUR',
      paymentMethod: 'Credit Card',
      confirmationNumber: generateRandomCode()
    };

    onConfirmBooking(booking);
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
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getTotalPrice = () => {
    return item.price * (type === 'flight' ? formData.passengers : 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Réservation {type === 'flight' ? 'Vol' : 'Hôtel'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
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
                  <p className="font-medium">
                    {(item as Flight).departure.city} - {(item as Flight).departure.time}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Arrivée</p>
                  <p className="font-medium">
                    {(item as Flight).arrival.city} - {(item as Flight).arrival.time}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{(item as Hotel).location}</span>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                {type === 'flight' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de passagers
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continuer
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de carte
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'expiration
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/AA"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demandes spéciales (optionnel)
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Régime alimentaire, assistance, etc."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
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