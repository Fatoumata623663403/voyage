import React, { useState } from 'react';
import { Flight } from '../types';
import { mockFlights } from '../utils/mockData';
import { Plane, Clock, MapPin, Users, Heart, Filter, Wifi, Utensils, Monitor, ChevronDown, ChevronUp, Star, Shield, Zap, TrendingUp, Award, AlertTriangle, Leaf, Calendar, CreditCard } from 'lucide-react';

interface FlightResultsProps {
  onBookFlight: (flight: Flight) => void;
  onToggleFavorite: (flightId: string) => void;
  favorites: string[];
}

const FlightResults: React.FC<FlightResultsProps> = ({ 
  onBookFlight, 
  onToggleFavorite, 
  favorites 
}) => {
  const [flights] = useState<Flight[]>(mockFlights);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure' | 'best'>('best');
  const [filterStops, setFilterStops] = useState<'all' | 'nonstop' | 'onestop'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'chart'>('list');
  const [showFilters, setShowFilters] = useState(true);

  const airlines = Array.from(new Set(flights.map(f => f.airline)));

  const filteredFlights = flights.filter(flight => {
    if (filterStops === 'nonstop') return flight.stops === 0;
    if (filterStops === 'onestop') return flight.stops === 1;
    if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false;
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'departure':
        return a.departure.time.localeCompare(b.departure.time);
      case 'best':
        const scoreA = (a.price / 100) + (a.stops * 50) + (parseInt(a.duration) * 10);
        const scoreB = (b.price / 100) + (b.stops * 50) + (parseInt(b.duration) * 10);
        return scoreA - scoreB;
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

  const toggleAirline = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) 
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    );
  };

  const getBestDealBadge = (flight: Flight, index: number) => {
    if (index === 0 && sortBy === 'best') return { text: 'Meilleur choix', color: 'bg-green-100 text-green-800', icon: Award };
    if (index === 0 && sortBy === 'price') return { text: 'Prix le plus bas', color: 'bg-blue-100 text-blue-800', icon: TrendingUp };
    if (flight.stops === 0) return { text: 'Vol direct', color: 'bg-purple-100 text-purple-800', icon: Zap };
    if (flight.originalPrice && flight.price < flight.originalPrice) return { text: 'Promotion', color: 'bg-red-100 text-red-800', icon: Star };
    return null;
  };

  const calculateSavings = (current: number, original?: number) => {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-4 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Filtres
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            {/* Prix */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Prix par personne</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Escales */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Escales</h4>
              <div className="space-y-3">
                {[
                  { value: 'all', label: 'Tous les vols', count: flights.length },
                  { value: 'nonstop', label: 'Vol direct', count: flights.filter(f => f.stops === 0).length },
                  { value: 'onestop', label: '1 escale', count: flights.filter(f => f.stops === 1).length }
                ].map((option) => (
                  <label key={option.value} className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        value={option.value}
                        checked={filterStops === option.value}
                        onChange={(e) => setFilterStops(e.target.value as any)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Compagnies */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Compagnies aériennes</h4>
              <div className="space-y-3">
                {airlines.map((airline) => (
                  <label key={airline} className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <span className="text-sm font-medium">{airline}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {flights.filter(f => f.airline === airline).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Réinitialiser */}
            <button
              onClick={() => {
                setFilterStops('all');
                setPriceRange([0, 2000]);
                setSelectedAirlines([]);
              }}
              className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}

        {/* Résultats */}
        <div className="flex-1">
          {/* En-tête des résultats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {sortedFlights.length} vol{sortedFlights.length > 1 ? 's' : ''} trouvé{sortedFlights.length > 1 ? 's' : ''}
                </h2>
                <p className="text-gray-600">Paris → New York • 15 mars 2024</p>
              </div>
              
              <div className="flex items-center space-x-4 flex-wrap">
                {/* Bouton filtres mobile */}
                {!showFilters && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </button>
                )}
                
                {/* Mode d'affichage */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  {[
                    { id: 'list', label: 'Liste' },
                    { id: 'calendar', label: 'Calendrier' },
                    { id: 'chart', label: 'Graphique' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === mode.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                
                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="best">Meilleur choix</option>
                  <option value="price">Prix croissant</option>
                  <option value="duration">Durée</option>
                  <option value="departure">Heure de départ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Alerte prix */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  💡 Conseil de prix
                </h3>
                <p className="text-yellow-700 mb-3">
                  Les prix ont baissé de 15% cette semaine ! C'est le moment idéal pour réserver.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-700 transition-colors">
                    Créer une alerte prix
                  </button>
                  <span className="text-sm text-yellow-600">Prix surveillés pour cette route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des vols */}
          <div className="space-y-6">
            {sortedFlights.map((flight, index) => {
              const badge = getBestDealBadge(flight, index);
              const isExpanded = expandedFlight === flight.id;
              const savings = calculateSavings(flight.price, flight.originalPrice);
              
              return (
                <div key={flight.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  {/* Badge */}
                  {badge && (
                    <div className={`${badge.color} px-80 py-3 text-sm font-semibold flex items-center`}>
                      <badge.icon className="w-4 h-4 mr-2" />
                      {badge.text}
                      {savings > 0 && <span className="ml-2">• Économisez {savings}%</span>}
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* En-tête du vol */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{flight.airline}</h3>
                          <p className="text-sm text-gray-500">{flight.flightNumber} • {flight.aircraft}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Émissions carbone */}
                        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                          <Leaf className="w-3 h-3 mr-1" />
                          {flight.carbonEmission}t CO₂
                        </div>
                        
                        {/* Favoris */}
                        <button
                          onClick={() => onToggleFavorite(flight.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(flight.id)
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(flight.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Détails du vol */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                      {/* Départ */}
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">{flight.departure.time}</p>
                        <p className="text-sm font-medium text-gray-700">{flight.departure.city}</p>
                        <p className="text-xs text-gray-500">{flight.departure.airportCode}</p>
                        {flight.departure.terminal && (
                          <p className="text-xs text-gray-400 mt-1">Terminal {flight.departure.terminal}</p>
                        )}
                      </div>

                      {/* Durée et escales */}
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-3 relative">
                            {flight.stops > 0 && (
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
                            )}
                          </div>
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 flex items-center justify-center mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {flight.duration}
                        </p>
                        <p className="text-xs text-gray-500">
                          {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
                        </p>
                        {flight.stopDetails && (
                          <p className="text-xs text-gray-400 mt-1">via {flight.stopDetails[0].airport}</p>
                        )}
                      </div>

                      {/* Arrivée */}
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">{flight.arrival.time}</p>
                        <p className="text-sm font-medium text-gray-700">{flight.arrival.city}</p>
                        <p className="text-xs text-gray-500">{flight.arrival.airportCode}</p>
                        {flight.arrival.terminal && (
                          <p className="text-xs text-gray-400 mt-1">Terminal {flight.arrival.terminal}</p>
                        )}
                      </div>

                      {/* Services */}
                      <div className="text-center">
                        <div className="flex justify-center space-x-2 mb-2">
                          {flight.wifiAvailable && <Wifi className="w-4 h-4 text-blue-500" />}
                          {flight.mealService && <Utensils className="w-4 h-4 text-green-500" />}
                          <Monitor className="w-4 h-4 text-purple-500" />
                        </div>
                        <p className="text-xs text-gray-600">{flight.baggage.checked}</p>
                        <p className="text-xs text-gray-500">{flight.baggage.cabin}</p>
                      </div>

                      {/* Prix et réservation */}
                      <div className="text-center">
                        <div className="mb-3">
                          {flight.originalPrice && (
                            <p className="text-lg text-gray-500 line-through">
                              {formatPrice(flight.originalPrice)}
                            </p>
                          )}
                          <p className="text-3xl font-bold text-gray-900">
                            {formatPrice(flight.price)}
                          </p>
                          <p className="text-sm text-gray-500">par personne</p>
                          {savings > 0 && (
                            <p className="text-sm text-green-600 font-medium">Économisez {savings}%</p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => onBookFlight(flight)}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Sélectionner
                        </button>
                        
                        <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                          <Shield className="w-3 h-3 mr-1" />
                          <span>Réservation sécurisée</span>
                        </div>
                      </div>
                    </div>

                    {/* Détails extensibles */}
                    <div className="border-t border-gray-200 pt-4">
                      <button
                        onClick={() => setExpandedFlight(isExpanded ? null : flight.id)}
                        className="flex items-center justify-between w-full text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        <span>Détails du vol et conditions</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Services inclus */}
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              Services inclus
                            </h4>
                            <div className="space-y-2">
                              {flight.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  {amenity}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bagages */}
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Bagages</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p><strong>Cabine:</strong> {flight.baggage.cabin}</p>
                              <p><strong>Soute:</strong> {flight.baggage.checked}</p>
                            </div>
                          </div>

                          {/* Conditions */}
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Conditions</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
                                {flight.cancellationPolicy}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                                {flight.changePolicy}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {sortedFlights.length > 10 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;