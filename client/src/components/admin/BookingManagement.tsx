import React from 'react';
import { Booking } from '../../types';

interface BookingManagementProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => void;
}

const BookingManagement: React.FC<BookingManagementProps> = ({ bookings, onUpdateStatus }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des réservations</h1>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Utilisateur</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.userId}</td>
              <td className="p-3">{b.type}</td>
              <td className="p-3">{b.totalPrice} €</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3 space-x-2">
                <select
                  value={b.status}
                  onChange={(e) => onUpdateStatus(b.id, e.target.value as any)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="cancelled">Annulé</option>
                  <option value="completed">Terminé</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
