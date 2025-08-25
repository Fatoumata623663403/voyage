import React from 'react';
import { Package } from '../../types';

interface PackageManagementProps {
  packages: Package[];
  onDeletePackage: (id: string) => void;
}

const PackageManagement: React.FC<PackageManagementProps> = ({ packages, onDeletePackage }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des séjours</h1>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Prix</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{pkg.title}</td>
              <td className="p-3">{pkg.destination}</td>
              <td className="p-3">{pkg.duration}</td>
              <td className="p-3">{pkg.price} €</td>
              <td className="p-3 space-x-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => onDeletePackage(pkg.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageManagement;
