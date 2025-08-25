import React from 'react';
import { User, Booking, Package } from '../../types';
import { Users, CreditCard, Package as PackageIcon } from 'lucide-react';

interface DashboardStatsProps {
  users: User[];
  bookings: Booking[];
  packages: Package[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ users, bookings, packages }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="font-semibold text-lg">Total utilisateurs</h2>
        </div>
        <p className="text-2xl font-bold">{users.length}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <PackageIcon className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="font-semibold text-lg">Réservations totales</h2>
        </div>
        <p className="text-2xl font-bold">{bookings.length}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <CreditCard className="w-6 h-6 text-yellow-500 mr-2" />
          <h2 className="font-semibold text-lg">Chiffre d’affaires</h2>
        </div>
        <p className="text-2xl font-bold">{totalRevenue.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default DashboardStats;
