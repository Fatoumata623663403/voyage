import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Plane, Building, Car, Camera, Package, ArrowUpDown, Plus, Minus, Zap, TrendingUp, Star, Clock, Filter, Globe, Compass } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<'flight' | 'hotel' | 'car' | 'activity' | 'package'>('flight');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [showPassengers, setShowPassengers] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    adults: 1,
    children: 0,
    infants: 0,
    checkIn: '',
    checkOut: '',
    rooms: 1,
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    class: 'economy',
    flexibleDates: false,
    nearbyAirports: false,
    directFlights: false,
    priceAlerts: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ ...searchData, type: searchType, tripType });
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const adjustPassengers = (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => {
    setSearchData(prev => ({
      ...prev,
      [type]: operation === 'add' 
        ? Math.min(prev[type] + 1, type === 'adults' ? 9 : 8)
        : Math.max(prev[type] - 1, type === 'adults' ? 1 : 0)
    }));
  };

  const swapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const searchTypes = [
    { id: 'flight', label: 'Vols', icon: Plane, color: 'text-blue-600' },
    { id: 'hotel', label: 'Hôtels', icon: Building, color: 'text-green-600' },
    { id: 'car', label: 'Voitures', icon: Car, color: 'text-purple-600' },
    { id: 'activity', label: 'Activités', icon: Camera, color: 'text-orange-600' },
    { id: 'package', label: 'Séjours', icon: Package, color: 'text-red-600' }
  ];

  const trendingDestinations = [
    { name: 'Bali', trend: '+25%', price: '€450', flag: '🇮🇩' },
    { name: 'Dubaï', trend: '+18%', price: '€380', flag: '🇦🇪' },
    { name: 'Tokyo', trend: '+32%', price: '€580', flag: '🇯🇵' },
    { name: 'New York', trend: '+8%', price: '€420', flag: '🇺🇸' }
  ];

  const popularDestinations = [
    'Paris', 'Londres', 'New York', 'Tokyo', 'Rome', 'Barcelone', 
    'Amsterdam', 'Berlin', 'Madrid', 'Lisbonne', 'Prague', 'Vienne',
    'Budapest', 'Copenhague', 'Stockholm', 'Oslo'
  ];

  const quickFilters = [
    { id: 'flexibleDates', label: 'Dates flexibles', icon: Calendar, desc: '±3 jours' },
    { id: 'nearbyAirports', label: 'Aéroports proches', icon: Globe, desc: 'Plus d\'options' },
    { id: 'directFlights', label: 'Vols directs', icon: Plane, desc: 'Sans escale' },
    { id: 'priceAlerts', label: 'Alertes prix', icon: TrendingUp, desc: 'Notifications' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-7xl mx-auto border border-gray-100">
      {/* Header avec types de recherche */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Où souhaitez-vous aller ?</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Compass className="w-4 h-4" />
            <span>Explorez le monde</span>
          </div>
        </div>
        
        <div className="flex bg-gray-50 rounded-2xl p-2 overflow-x-auto">
          {searchTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id as any)}
                className={`flex items-center justify-center flex-1 py-4 px-6 rounded-xl font-semibold transition-all whitespace-nowrap min-w-[120px] ${
                  searchType === type.id
                    ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-5 h-5 mr-2 ${searchType === type.id ? type.color : ''}`} />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {searchType === 'flight' && (
          <>
            {/* Options rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
              {quickFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <label key={filter.id} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={searchData[filter.id as keyof typeof searchData] as boolean}
                      onChange={(e) => handleInputChange(filter.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`flex items-center p-3 rounded-xl border-2 transition-all ${
                      searchData[filter.id as keyof typeof searchData]
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}>
                      <Icon className={`w-5 h-5 mr-3 ${
                        searchData[filter.id as keyof typeof searchData] ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium text-sm text-gray-900">{filter.label}</div>
                        <div className="text-xs text-gray-500">{filter.desc}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Type de voyage */}
            <div className="flex space-x-6">
              {[
                { id: 'roundtrip', label: 'Aller-retour', desc: 'Le plus populaire' },
                { id: 'oneway', label: 'Aller simple', desc: 'Voyage flexible' },
                { id: 'multicity', label: 'Multi-destinations', desc: 'Plusieurs villes' }
              ].map((type) => (
                <label key={type.id} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value={type.id}
                    checked={tripType === type.id}
                    onChange={(e) => setTripType(e.target.value as any)}
                    className="w-4 h-4 text-blue-600 mr-3"
                  />
                  <div>
                    <span className="font-medium text-gray-900">{type.label}</span>
                    <div className="text-xs text-gray-500">{type.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Destinations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Départ
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Ville ou aéroport de départ"
                    list="destinations"
                  />
                </div>
              </div>

              {/* Bouton d'échange */}
              <button
                type="button"
                onClick={swapLocations}
                className="absolute left-1/2 top-12 transform -translate-x-1/2 z-10 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-110"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Arrivée
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Ville ou aéroport d'arrivée"
                    list="destinations"
                  />
                </div>
              </div>
            </div>

            {/* Dates et passagers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.departure}
                    onChange={(e) => handleInputChange('departure', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {tripType === 'roundtrip' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Retour
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchData.return}
                      onChange={(e) => handleInputChange('return', e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Passagers
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassengers(!showPassengers)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white text-lg"
                  >
                    {searchData.adults + searchData.children + searchData.infants} passager{(searchData.adults + searchData.children + searchData.infants) > 1 ? 's' : ''}
                  </button>
                  
                  {showPassengers && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 p-6 mt-2">
                      <div className="space-y-6">
                        {[
                          { type: 'adults', label: 'Adultes', desc: '12 ans et plus', min: 1 },
                          { type: 'children', label: 'Enfants', desc: '2-11 ans', min: 0 },
                          { type: 'infants', label: 'Bébés', desc: 'Moins de 2 ans', min: 0 }
                        ].map(({ type, label, desc, min }) => (
                          <div key={type} className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{label}</p>
                              <p className="text-sm text-gray-500">{desc}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                onClick={() => adjustPassengers(type as any, 'subtract')}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                disabled={Number(searchData[type as keyof typeof searchData]) <= min}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold text-lg">
                                {searchData[type as keyof typeof searchData]}
                              </span>
                              <button
                                type="button"
                                onClick={() => adjustPassengers(type as any, 'add')}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Classe
                </label>
                <select
                  value={searchData.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="economy">Économique</option>
                  <option value="premium">Premium Éco</option>
                  <option value="business">Affaires</option>
                  <option value="first">Première</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Autres types de recherche */}
        {searchType === 'hotel' && (
          <>
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Ville, région, hôtel ou point d'intérêt"
                  list="destinations"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Arrivée
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <select
                    value={searchData.adults}
                    onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} voyageur{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Chambres
                </label>
                <select
                  value={searchData.rooms}
                  onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} chambre{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}


          {/* Bouton de recherche */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-bold py-6 px-8 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all transform hover:scale-105 flex items-center justify-center text-xl shadow-2xl hover:shadow-3xl"
        >
          <Zap className="w-6 h-6 mr-3" />
          Rechercher les meilleures offres
        </button>

        {/* Destinations tendance et populaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Destinations tendance */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              Destinations tendance
            </h4>
            <div className="space-y-3">
              {trendingDestinations.map((dest) => (
                <button
                  key={dest.name}
                  type="button"
                  onClick={() => handleInputChange(searchType === 'flight' ? 'to' : 'to', dest.name)}
                  className="flex items-center justify-between w-full p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{dest.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{dest.name}</div>
                      <div className="text-sm text-gray-600">À partir de {dest.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {dest.trend}
                    </span>
                    <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Destinations populaires */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Destinations populaires
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {popularDestinations.slice(0, 8).map((destination) => (
                <button
                  key={destination}
                  type="button"
                  onClick={() => handleInputChange(searchType === 'flight' ? 'to' : 'to', destination)}
                  className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all hover:shadow-md"
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>
        </div>

        
      </form>

      {/* Datalist pour l'autocomplétion */}
      <datalist id="destinations">
        {popularDestinations.map((destination) => (
          <option key={destination} value={destination} />
        ))}
      </datalist>
    </div>
  );
};

export default SearchForm;