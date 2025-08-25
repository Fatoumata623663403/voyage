import React from 'react';
import { Booking } from '../../types';

interface PaymentsSupportProps {
  bookings: Booking[];
}

const PaymentsSupport: React.FC<PaymentsSupportProps> = ({ bookings }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Paiements & Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total recettes</h2>
          <p className="text-2xl">{totalRevenue.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Support client</h2>
          <p>Nombre de demandes en cours: 5</p>
          <p>Tickets ouverts: 3</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsSupport;
