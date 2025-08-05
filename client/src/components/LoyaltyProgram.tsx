import React from 'react';
import { Star, Gift, Crown, Award, TrendingUp } from 'lucide-react';

interface LoyaltyProgramProps {
  user: any;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ user }) => {
  const levels = [
    { name: 'Bronze', min: 0, max: 999, color: 'bg-orange-100 text-orange-800', icon: Award },
    { name: 'Silver', min: 1000, max: 4999, color: 'bg-gray-100 text-gray-800', icon: Star },
    { name: 'Gold', min: 5000, max: 9999, color: 'bg-yellow-100 text-yellow-800', icon: Crown },
    { name: 'Platinum', min: 10000, max: Infinity, color: 'bg-purple-100 text-purple-800', icon: Gift }
  ];

  const currentLevel = levels.find(level => 
    user.loyaltyPoints >= level.min && user.loyaltyPoints <= level.max
  ) || levels[0];

  const nextLevel = levels.find(level => level.min > user.loyaltyPoints);
  const pointsToNext = nextLevel ? nextLevel.min - user.loyaltyPoints : 0;
  const progressPercentage = nextLevel 
    ? ((user.loyaltyPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  const CurrentIcon = currentLevel.icon;

  const benefits = {
    Bronze: ['Assistance 24/7', 'Annulation gratuite'],
    Silver: ['Surclassement gratuit', 'Accès prioritaire', 'Bagages supplémentaires'],
    Gold: ['Salon VIP', 'Check-in prioritaire', 'Remises exclusives 15%'],
    Platinum: ['Concierge personnel', 'Upgrades automatiques', 'Remises exclusives 25%']
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Crown className="w-6 h-6 mr-2 text-yellow-500" />
        Programme de Fidélité Easy-Trip
      </h3>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CurrentIcon className="w-8 h-8 mr-3 text-blue-600" />
            <div>
              <h4 className="text-lg font-bold text-gray-900">Niveau {currentLevel.name}</h4>
              <p className="text-gray-600">{user.loyaltyPoints} points</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentLevel.color}`}>
            {currentLevel.name}
          </div>
        </div>

        {nextLevel && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression vers {nextLevel.name}</span>
              <span>{pointsToNext} points restants</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Vos avantages actuels :</h4>
        <div className="space-y-2">
          {benefits[currentLevel.name as keyof typeof benefits]?.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* All Levels */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Tous les niveaux :</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {levels.map((level) => {
            const LevelIcon = level.icon;
            const isActive = level.name === currentLevel.name;
            
            return (
              <div
                key={level.name}
                className={`p-3 rounded-lg border text-center ${
                  isActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <LevelIcon className={`w-6 h-6 mx-auto mb-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <div className="text-sm font-medium text-gray-900">{level.name}</div>
                <div className="text-xs text-gray-500">
                  {level.min}+ pts
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Earn Points */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
          Comment gagner des points ?
        </h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• 1 point = 1€ dépensé</p>
          <p>• Bonus de 500 points pour chaque avis laissé</p>
          <p>• Double points sur les réservations de dernière minute</p>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;