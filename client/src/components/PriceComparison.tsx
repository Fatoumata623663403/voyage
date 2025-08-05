import React from 'react';
import { TrendingUp, TrendingDown, Minus, Bell, Calendar, Target } from 'lucide-react';

interface PriceComparisonProps {
  currentPrice: number;
  historicalPrices: number[];
  competitors: { name: string; price: number; }[];
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ 
  currentPrice, 
  historicalPrices, 
  competitors 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const averagePrice = historicalPrices.reduce((a, b) => a + b, 0) / historicalPrices.length;
  const priceTrend = currentPrice > averagePrice ? 'up' : currentPrice < averagePrice ? 'down' : 'stable';
  const priceDifference = Math.abs(currentPrice - averagePrice);
  const percentageDifference = ((priceDifference / averagePrice) * 100).toFixed(0);

  const getTrendIcon = () => {
    switch (priceTrend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendText = () => {
    switch (priceTrend) {
      case 'up':
        return `${percentageDifference}% plus cher que d'habitude`;
      case 'down':
        return `${percentageDifference}% moins cher que d'habitude`;
      default:
        return 'Prix habituel';
    }
  };

  const getTrendColor = () => {
    switch (priceTrend) {
      case 'up':
        return 'text-red-600 bg-red-50';
      case 'down':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des prix</h3>
      
      {/* Price Trend */}
      <div className={`flex items-center p-3 rounded-lg mb-4 ${getTrendColor()}`}>
        {getTrendIcon()}
        <span className="ml-2 text-sm font-medium">{getTrendText()}</span>
      </div>

      {/* Price History Chart (simplified) */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Évolution des prix (30 derniers jours)</h4>
        <div className="flex items-end space-x-1 h-20">
          {historicalPrices.slice(-10).map((price, index) => {
            const height = (price / Math.max(...historicalPrices)) * 100;
            return (
              <div
                key={index}
                className="bg-blue-200 rounded-t flex-1 relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatPrice(price)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitor Comparison */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Comparaison avec d'autres sites</h4>
        <div className="space-y-2">
          {competitors.map((competitor, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">{competitor.name}</span>
              <span className={`text-sm font-medium ${
                competitor.price <= currentPrice ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPrice(competitor.price)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Alert */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <Bell className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 mb-1">Alerte prix</p>
            <p className="text-sm text-blue-700">
              {priceTrend === 'down' ? 'C\'est un bon moment pour réserver !' : 'Surveillez les prix pour de meilleures offres.'}
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1">
              Créer une alerte prix →
            </button>
          </div>
        </div>
      </div>

      {/* Best Time to Book */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <div className="flex items-start">
          <Calendar className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800 mb-1">Meilleur moment pour réserver</p>
            <p className="text-sm text-green-700">
              Généralement 6-8 semaines avant le départ pour cette destination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;