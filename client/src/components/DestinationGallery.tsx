import React from 'react';
import { MapPin, ArrowRight, Star, TrendingUp, Plane, Calendar, Users, Award,  } from 'lucide-react';
import { popularDestinations } from '../utils/mockData';
import { destinationCategories } from "../shared/countries";



interface DestinationGalleryProps {
  onDestinationSelect: (destination: string) => void;
}

const DestinationGallery: React.FC<DestinationGalleryProps> = ({ onDestinationSelect }) => {
 const categories = [
    {
      name: "Europe",
      destinations: destinationCategories.europe.slice(0, 6),
      gradient: "from-blue-500 to-purple-600",
      icon: "🇪🇺",
    },
    {
      name: "Asie",
      destinations: destinationCategories.asie.slice(0, 6),
      gradient: "from-red-500 to-pink-600",
      icon: "🏯",
    },
    {
      name: "Amériques",
      destinations: destinationCategories.ameriques.slice(0, 6),
      gradient: "from-green-500 to-blue-600",
      icon: "🗽",
    },
    {
      name: "Afrique",
      destinations: destinationCategories.afrique.slice(0, 6),
      gradient: "from-orange-500 to-yellow-600",
      icon: "🦁",
    },

  ];
  
  const featuredDeals = [
    { 
      destination: 'Bali', 
      discount: '-35%', 
      price: '€450', 
      originalPrice: '€690',
      flag: '🇮🇩',
      description: 'Temples mystiques et plages paradisiaques',
      validUntil: '15 Octombre'
    },
    { 
      destination: 'Tokyo', 
      discount: '-25%', 
      price: '€580', 
      originalPrice: '€780',
      flag: '🇯🇵',
      description: 'Tradition et modernité en harmonie',
      validUntil: '20 Novembre'
    },
    { 
      destination: 'New York', 
      discount: '-20%', 
      price: '€420', 
      originalPrice: '€520',
      flag: '🇺🇸',
      description: 'La ville qui ne dort jamais',
      validUntil: '25 Decembre'
    }
  ];

  const travelStats = [
    { icon: Users, value: '2M+', label: 'Voyageurs' },
    { icon: Star, value: '4.9', label: 'Note moyenne' },
    { icon: Award, value: '150+', label: 'Destinations' },
    { icon: Calendar, value: '24/7', label: 'Support' }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Destinations populaires</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Explorez le Monde avec Easy-Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les destinations les plus prisées par nos voyageurs et profitez d'offres exclusives
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {travelStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Bannière d'offres flash */}
        <div className="mb-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">⚡ Offres Flash Limitées</h3>
                <p className="text-lg opacity-90">Réservez maintenant et économisez jusqu'à 35%</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div className="text-sm opacity-80">Se termine dans</div>
                  <div className="text-2xl font-bold">2j 14h 32m</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDeals.map((deal, index) => (
                <div 
                  key={deal.destination} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group border border-white/20"
                  onClick={() => onDestinationSelect(deal.destination)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{deal.flag}</span>
                      <div>
                        <h4 className="font-bold text-lg">{deal.destination}</h4>
                        <p className="text-sm opacity-80">{deal.description}</p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      {deal.discount}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">{deal.price}</span>
                      <span className="text-lg line-through opacity-60 ml-2">{deal.originalPrice}</span>
                    </div>
                    <div className="flex items-center text-sm opacity-80">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Jusqu'au {deal.validUntil}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Galerie de destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => onDestinationSelect(destination.name)}
            >
              <div className={`${index === 0 ? 'h-96 md:h-full' : 'h-80'}`}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Badge trending */}
              {destination.trending && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {destination.trending}
                </div>
              )}
              
              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2 opacity-80" />
                  <span className="text-sm opacity-90">{destination.country}</span>
                  <div className="ml-auto flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
                
                <h3 className={`font-bold mb-3 ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {destination.name}
                </h3>
                
                <p className={`opacity-90 mb-4 ${index === 0 ? 'text-base' : 'text-sm'} line-clamp-2`}>
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <Plane className="w-4 h-4 mr-2" />
                    <span>Explorer</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">À partir de €{destination.priceFrom}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl">
            Voir toutes les destinations
          </button>
        </div>
      </div>

       <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      


       

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Destinations populaires par région
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez nos destinations les plus prisées dans le monde entier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="overflow-hidden">
              <div
                className={`h-32 bg-gradient-to-r ${category.gradient} flex items-center justify-center`}
              >
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {category.destinations.map((destination) => {
                    const [city, country] = destination.split(", ");
                    return (
                      <button
                        key={destination}
                        onClick={() => onDestinationSelect?.(destination)}
                        className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {city}
                            </div>
                            <div className="text-sm text-gray-500">
                              {country}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick examples */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Exemples de recherches populaires
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Paris → Tokyo",
              "Londres → New York",
              "Madrid → Bangkok",
              "Rome → Sydney",
              "Berlin → Marrakech",
              "Amsterdam → Bali",
              "Paris → Dakar",
              "Londres → Le Cap",
              "Madrid → Tunis",
              "Milan → Nairobi",
              "Bruxelles → Casablanca",
              "Genève → Zanzibar",
            ].map((route) => (
              <div
                key={route}
                
                className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer transition-colors"
                onClick={() => {
                  const [departure, destination] = route.split(" → ");
                  onDestinationSelect?.(departure);
                  // Could also set destination automatically
                }}
              >
                <Plane className="w-3 h-3 mr-2" />
                {route}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
    
      </div>
    
  );
};

export default DestinationGallery;