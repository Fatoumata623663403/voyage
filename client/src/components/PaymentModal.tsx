import React, { useState } from 'react';
import { X, CreditCard, Shield, Lock } from 'lucide-react';
import {
 
  Smartphone,
 
  Check,
  AlertCircle,
} from "lucide-react";

export type PaymentModal = "card" | "orangeMoney" | "paypal" | "apple";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
    selectedMethod: PaymentModal;
  onMethodChange: (method: PaymentModal) => void;
  onPaymentDataChange: (data: any) => void;
  className?: string;

}



const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onPaymentSuccess, onPaymentDataChange }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' |'orangeMoney'| 'apple'>('orangeMoney');
      const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: '',
        
        
      });

        const [orangeMoneyData, setOrangeMoneyData] = useState({
        number: "",
        name: "",
        pin: "",
        
      });

      const [paypalData, setPaypalData] = useState({
        email: "",
      });

  

  if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
      
    e.preventDefault();
    // Simulation du paiement
    
    setTimeout(() => {
      onPaymentSuccess();
      
      onClose();
    }, 2000);
  };


    const handleCardDataChange = (field: string, value: string) => {
    const newData = { ...cardData, [field]: value };
    setCardData(newData);
    onPaymentDataChange({ type: "card", data: newData });
  };

  const handleOrangeMoneyDataChange = (field: string, value: string) => {
    const newData = { ...orangeMoneyData, [field]: value };
    setOrangeMoneyData(newData);
    onPaymentDataChange({ type: "orangeMoney", data: newData });
  };

  const handlePaypalDataChange = (field: string, value: string) => {
    const newData = { ...paypalData, [field]: value };
    setPaypalData(newData);
    onPaymentDataChange({ type: "paypal", data: newData });
  };
const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };
const formatOrangeNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 3) {
      return (
        "+224 " +
        v.substring(0, 2) +
        " " +
        v.substring(2, 5) +
        " " +
        v.substring(5, 7) +
        " " +
        v.substring(7, 9)
      );
    }
    return v;
  };

  

  

    const renderPaymentForm = () => {
    switch ( setPaymentMethod) {
      case "card":
        return renderCardForm();
      case "orangeMoney":
        return renderOrangeMoneyForm();
      case "paypal":
        return renderPaypalForm();
      case "apple":
        return renderApplePayForm();
      default:
        return null;
    }
  };


  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
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
               <CreditCard>{renderPaymentForm()}</CreditCard>
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

            <button
              onClick={() =>setPaymentMethod('orangeMoney')}
              className={`p-3 border rounded-lg text-center ${
              paymentMethod === 'orangeMoney' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              >
              <span className="text-sm font-bold">OrangeMoney</span>
            
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

      {paymentMethod === 'orangeMoney' && (
          <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 text-orange-800">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm font-medium">Orange Money Guinée</span>
                    </div>
                    <p className="text-xs text-orange-700 mt-1">
                      Assurez-vous que votre compte Orange Money a suffisamment de solde
                    </p>
                  </div>

                  <div>
                    <label htmlFor="orange-number">Numéro Orange Money</label>
                    <input
                      id="orange-number"
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+224 XX XXX XX XX"
                      value={orangeMoneyData.number}
                      onChange={(e) =>
                        handleOrangeMoneyDataChange(
                          "number",
                          formatOrangeNumber(e.target.value),
                        )
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="orange-name">Nom du titulaire</label>
                    <input
                      id="orange-name"
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom complet du compte Orange Money"
                      value={orangeMoneyData.name}
                      onChange={(e) => handleOrangeMoneyDataChange("name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="orange-pin">Code PIN</label>
                    <input
                      id="orange-pin"
                      type="password"
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="••••"
                      value={orangeMoneyData.pin}
                      onChange={(e) =>
                        handleOrangeMoneyDataChange(
                          "pin",
                          e.target.value.replace(/[^0-9]/gi, ""),
                        )
                      }
                      maxLength={4}
                    />
                  </div>
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


 {paymentMethod === 'paypal' && (
          <form onSubmit={handleSubmit} className="space-y-4">
                  
              <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 text-blue-800">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">PayPal sécurisé</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Vous serez redirigé vers PayPal pour finaliser le paiement
        </p>
      </div>

      <div>
        <label htmlFor="paypal-email">Email PayPal</label>
        <input
          id="paypal-email"
          type="email"
           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="votre@email.com"
          value={paypalData.email}
          onChange={(e) => handlePaypalDataChange("email", e.target.value)}
        />
      </div>
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


 {paymentMethod === 'apple' && (
          <form onSubmit={handleSubmit} className="space-y-4">
                  
               <div className="space-y-4">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🍎</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">Apple Pay</h3>
        <p className="text-sm text-gray-600 mb-4">
          Utilisez Touch ID ou Face ID pour un paiement rapide et sécurisé
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
          <Check className="w-4 h-4" />
          <span>Appareil compatible détecté</span>
        </div>
      </div>
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