import React from 'react';
import { TrendingUp, Calendar, Users, MapPin, Clock, Thermometer, DollarSign, Plane, Camera, Utensils } from 'lucide-react';

interface TravelInsightsProps {
  destination: string;
}

const TravelInsights: React.FC<TravelInsightsProps> = ({ destination }) => {
  const insights = {
    bestTimeToVisit: 'Mai - Septembre',
    currentSeason: 'Haute saison',
    averageStay: '4 nuits',
    popularWith: 'Couples, Familles',
    peakSeason: 'Juillet - Août',
    weather: '22°C en moyenne',
    crowdLevel: 'Modéré',
    priceLevel: 'Élevé',
    budgetTip: 'Économisez 30% en évitant juillet-août',
    topAttractions: ['Tour Eiffel', 'Louvre', 'Notre-Dame', 'Champs-Élysées'],
    localTips: [
      'Réservez les restaurants à l\'avance',
      'Évitez les heures de pointe (8h-9h, 18h-19h)',
      'Achetez un pass transport hebdomadaire',
      'Les musées sont gratuits le 1er dimanche du mois'
    ]
  };

  return (
    <div className='p-60'>
    <div className="shadow-md m-20 rounded-lg p-6  ">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="w-5h-5 mr-2" />
        Informations de voyage - {destination}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-60">
        {/* Meilleure période */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-medium text-gray-900">Meilleure période</h4>
          </div>
          <p className="text-blue-800 font-medium">{insights.bestTimeToVisit}</p>
          <p className="text-sm text-blue-600 mt-1">Temps idéal et moins de foule</p>
        </div>

        {/* Météo */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Thermometer className="w-5 h-5 text-orange-600 mr-2" />
            <h4 className="font-medium text-gray-900">Météo actuelle</h4>
          </div>
          <p className="text-orange-800 font-medium">{insights.weather}</p>
          <p className="text-sm text-orange-600 mt-1">Conditions agréables</p>
        </div>

        {/* Durée de séjour */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-medium text-gray-900">Durée recommandée</h4>
          </div>
          <p className="text-green-800 font-medium">{insights.averageStay}</p>
          <p className="text-sm text-green-600 mt-1">Durée moyenne des visiteurs</p>
        </div>

        {/* Popularité */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <h4 className="font-medium text-gray-900">Populaire avec</h4>
          </div>
          <p className="text-purple-800 font-medium">{insights.popularWith}</p>
          <p className="text-sm text-purple-600 mt-1">Types de voyageurs</p>
        </div>
      </div>

      {/* Attractions principales */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Attractions incontournables
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {insights.topAttractions.map((attraction, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{attraction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget et conseils */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          Budget et conseils
        </h4>
        <div className="space-y-2">
          <p className="text-sm text-yellow-800 font-medium">{insights.budgetTip}</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {insights.localTips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Niveau de prix */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Niveau de prix</span>
          <span className="text-sm font-bold text-red-600">{insights.priceLevel}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Saison</span>
          <span className="text-sm font-bold text-orange-600">{insights.currentSeason}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TravelInsights;