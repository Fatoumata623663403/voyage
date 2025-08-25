import React, { useState } from 'react';
import { Hotel } from '../types';
import { mockHotels } from '../utils/mockData';
import { Star, MapPin, Heart, Wifi, Car, Coffee, Utensils, Waves, Dumbbell, Filter, Users, Calendar, Shield, Award, ChevronDown, ChevronUp, Zap, Crown, TrendingUp } from 'lucide-react';
import MapView from "./MapView";
import Header from './Header';

interface HotelResultsProps {
  onBookHotel: (hotel: Hotel) => void;
  onToggleFavorite: (hotelId: string) => void;
  favorites: string[];
}

const HotelResults: React.FC<HotelResultsProps> = ({ 
  onBookHotel, 
  onToggleFavorite, 
  favorites 
}) => {
  const [hotels] = useState<Hotel[]>(mockHotels);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance' | 'popularity'>('popularity');
  const [filterRating, setFilterRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null);

  const amenitiesList = ['WiFi', 'Parking', 'Spa', 'Restaurant', 'Pool', 'Gym', 'Bar', 'Room Service'];

  const filteredHotels = hotels.filter(hotel => {
    if (hotel.rating < filterRating) return false;
    if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) return false;
    if (selectedAmenities.length > 0 && !selectedAmenities.every(amenity => hotel.amenities.includes(amenity))) return false;
    return true;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return Math.random() - 0.5; // Simulation
      case 'popularity':
        return b.reviews - a.reviews;
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'spa':
        return <Coffee className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'pool':
        return <Waves className="w-4 h-4" />;
      case 'gym':
        return <Dumbbell className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const getBadge = (hotel: Hotel, index: number) => {
    if (index === 0 && sortBy === 'popularity') return { text: 'Plus populaire', color: 'bg-purple-100 text-purple-800', icon: Crown };
    if (index === 0 && sortBy === 'price') return { text: 'Meilleur prix', color: 'bg-green-100 text-green-800', icon: TrendingUp };
    if (hotel.rating >= 4.8) return { text: 'Excellent', color: 'bg-yellow-100 text-yellow-800', icon: Award };
    if (hotel.breakfast) return { text: 'Petit-déjeuner inclus', color: 'bg-blue-100 text-blue-800', icon: Coffee };
    if (hotel.cancellation === 'Annulation gratuite') return { text: 'Annulation gratuite', color: 'bg-green-100 text-green-800', icon: Shield };
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-80 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Prix par nuit</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Étoiles</h4>
          <div className="space-y-2">
            {[0, 3, 4, 4.5, 5].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filterRating === rating}
                  onChange={(e) => setFilterRating(parseFloat(e.target.value))}
                  className="mr-2 text-blue-600"
                />
                <div className="flex items-center">
                  {rating === 0 ? (
                    <span className="text-sm">Toutes les notes</span>
                  ) : (
                    <>
                      <div className="flex items-center mr-2">
                        {[...Array(Math.floor(rating))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        {rating % 1 !== 0 && <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />}
                      </div>
                      <span className="text-sm">{rating}+ étoiles</span>
                    </>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Équipements</h4>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="mr-2 text-blue-600"
                />
                <div className="flex items-center">
                  {getAmenityIcon(amenity)}
                  <span className="ml-2 text-sm">{amenity}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setFilterRating(0);
            setPriceRange([0, 1000]);
            setSelectedAmenities([]);
          }}
          className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Effacer tous les filtres
        </button>
      </div>

      {/* Results */}
      <div className="flex-1">
        {/* Sort Options */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {sortedHotels.length} hôtel{sortedHotels.length > 1 ? 's' : ''} trouvé{sortedHotels.length > 1 ? 's' : ''}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Popularité</option>
                <option value="price">Prix</option>
                <option value="rating">Note</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="space-y-6">
          {sortedHotels.map((hotel, index) => {
            const badge = getBadge(hotel, index);
            const isExpanded = expandedHotel === hotel.id;
            
            return (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                {badge && (
                  <div className={`${badge.color} px-4 py-2 text-sm font-medium flex items-center`}>
                    <badge.icon className="w-4 h-4 mr-2" />
                    {badge.text}
                  </div>
                )}
                
                <div className="md:flex">
                  {/* Hotel Image */}
                  <div className="md:w-1/3 relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <button
                      onClick={() => onToggleFavorite(hotel.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                        favorites.includes(hotel.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(hotel.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Hotel Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-900 mr-3">{hotel.name}</h3>
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
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-3">
                            <Award className="w-4 h-4 mr-1" />
                            {hotel.rating}
                          </div>
                          <span className="text-sm text-gray-600">
                            Excellent ({hotel.reviews} avis)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-sm text-blue-600">+{hotel.amenities.length - 4} autres</span>
                      )}
                    </div>

                    {/* Room Info & Booking */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>2 adultes</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>1 nuit</span>
                        </div>
                        {hotel.cancellation === 'Annulation gratuite' && (
                          <div className="flex items-center text-green-600">
                            <Shield className="w-4 h-4 mr-1" />
                            <span>Annulation gratuite</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(hotel.price)}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">par nuit</p>
                        <button
                          onClick={() => onBookHotel(hotel)}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          Réserver
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <button
                        onClick={() => setExpandedHotel(isExpanded ? null : hotel.id)}
                        className="flex items-center justify-between w-full text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <span>Plus d'informations</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Équipements de la chambre</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>• Climatisation</p>
                              <p>• Télévision écran plat</p>
                              <p>• Minibar</p>
                              <p>• Coffre-fort</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Services</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>• Service en chambre 24h/24</p>
                              <p>• Concierge</p>
                              <p>• Navette aéroport</p>
                              <p>• Blanchisserie</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelResults;