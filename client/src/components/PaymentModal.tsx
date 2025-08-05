import React, { useState } from 'react';
import { X, CreditCard, Shield, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation du paiement
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Paiement sécurisé</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Montant */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">Total à payer</span>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(amount)}</span>
          </div>
        </div>

        {/* Méthodes de paiement */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Méthode de paiement</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 border rounded-lg text-center ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Carte</span>
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`p-3 border rounded-lg text-center ${
                paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <span className="text-sm font-bold">PayPal</span>
            </button>
            <button
              onClick={() => setPaymentMethod('apple')}
              className={`p-3 border rounded-lg text-center ${
                paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <span className="text-sm font-bold">Apple Pay</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                required
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  required
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom sur la carte
              </label>
              <input
                type="text"
                required
                value={cardData.name}
                onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Jean Dupont"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Lock className="w-5 h-5 mr-2" />
              Payer {formatPrice(amount)}
            </button>
          </form>
        )}

        {/* Sécurité */}
        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-2" />
          <span>Paiement sécurisé SSL 256-bit</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;