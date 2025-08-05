import React from 'react';
import { Heart, Plane, Building, MapPin, Star } from 'lucide-react';
import { mockFlights, mockHotels } from '../utils/mockData';

interface FavoritesProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite }) => {
  const favoriteFlights = mockFlights.filter(flight => favorites.includes(flight.id));
  const favoriteHotels = mockHotels.filter(hotel => favorites.includes(hotel.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucun favori
        </h3>
        <p className="text-gray-500">
          Ajoutez des vols ou des hôtels à vos favoris pour les retrouver facilement.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Mes Favoris</h2>
      
      {favoriteFlights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-blue-600" />
            Vols favoris
          </h3>
          <div className="space-y-4">
            {favoriteFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Plane className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{flight.airline}</h4>
                      <p className="text-sm text-gray-500">{flight.aircraft}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(flight.id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium">{flight.departure.time}</p>
                      <p className="text-sm text-gray-500">{flight.departure.city}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">{flight.duration}</p>
                    <p className="text-xs text-gray-400">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium">{flight.arrival.time}</p>
                      <p className="text-sm text-gray-500">{flight.arrival.city}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">{formatPrice(flight.price)}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {favoriteHotels.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-green-600" />
            Hôtels favoris
          </h3>
          <div className="space-y-4">
            {favoriteHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{hotel.name}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(hotel.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {hotel.rating} ({hotel.reviews} avis)
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleFavorite(hotel.id)}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{hotel.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">{formatPrice(hotel.price)}</p>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;