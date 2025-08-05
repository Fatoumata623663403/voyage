import React, { useState } from 'react';
import { CarRental } from '../types';
import { mockCarRentals } from '../utils/mockData';
import { Car, Users, Fuel, Settings, Heart, Filter, MapPin } from 'lucide-react';

interface CarRentalResultsProps {
  onBookCar: (car: CarRental) => void;
  onToggleFavorite: (carId: string) => void;
  favorites: string[];
}

const CarRentalResults: React.FC<CarRentalResultsProps> = ({ 
  onBookCar, 
  onToggleFavorite, 
  favorites 
}) => {
  const [cars] = useState<CarRental[]>(mockCarRentals);
  const [sortBy, setSortBy] = useState<'price' | 'brand' | 'category'>('price');
  const [filterTransmission, setFilterTransmission] = useState<'all' | 'manual' | 'automatic'>('all');

  const filteredCars = cars.filter(car => {
    if (filterTransmission === 'all') return true;
    return car.transmission === filterTransmission;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filtres:</span>
          </div>
          
          <select
            value={filterTransmission}
            onChange={(e) => setFilterTransmission(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes transmissions</option>
            <option value="manual">Manuelle</option>
            <option value="automatic">Automatique</option>
          </select>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="price">Prix</option>
              <option value="brand">Marque</option>
              <option value="category">Catégorie</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {sortedCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="md:flex">
              {/* Car Image */}
              <div className="md:w-1/3">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 md:h-full object-cover rounded-l-lg"
                />
              </div>

              {/* Car Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{car.category}</p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(car.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(car.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(car.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Car Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{car.seats} places</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {car.transmission === 'automatic' ? 'Auto' : 'Manuelle'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{car.fuel}</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Climatisation</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(car.price)}
                    </p>
                    <p className="text-sm text-gray-500">par jour</p>
                  </div>
                  <button
                    onClick={() => onBookCar(car)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalResults;