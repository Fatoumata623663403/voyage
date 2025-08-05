import React, { useState } from 'react';
import { Package } from '../types';
import { mockPackages } from '../utils/mockData';
import { Calendar, Star, MapPin, Heart, Filter, Tag, CheckCircle } from 'lucide-react';

interface PackageResultsProps {
  onBookPackage: (pkg: Package) => void;
  onToggleFavorite: (packageId: string) => void;
  favorites: string[];
}

const PackageResults: React.FC<PackageResultsProps> = ({ 
  onBookPackage, 
  onToggleFavorite, 
  favorites 
}) => {
  const [packages] = useState<Package[]>(mockPackages);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'duration'>('price');

  const sortedPackages = [...packages].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
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

  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Trier par:</span>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="price">Prix</option>
            <option value="rating">Note</option>
            <option value="duration">Durée</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {sortedPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="md:flex">
              {/* Package Image */}
              <div className="md:w-1/3 relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 md:h-full object-cover"
                />
                {pkg.originalPrice > pkg.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{calculateDiscount(pkg.price, pkg.originalPrice)}%
                  </div>
                )}
              </div>

              {/* Package Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{pkg.destination}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(pkg.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {pkg.rating} ({pkg.reviews} avis)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(pkg.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(pkg.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(pkg.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Includes */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Inclus dans ce séjour:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Points forts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(pkg.price)}
                      </p>
                      {pkg.originalPrice > pkg.price && (
                        <p className="text-lg text-gray-500 line-through ml-2">
                          {formatPrice(pkg.originalPrice)}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">par personne</p>
                  </div>
                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Réserver ce séjour
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

export default PackageResults;