import React, { useState } from 'react';
import { Activity } from '../types';
import { mockActivities } from '../utils/mockData';
import { Clock, Star, MapPin, Heart, Filter, Users, Camera } from 'lucide-react';

interface ActivityResultsProps {
  onBookActivity: (activity: Activity) => void;
  onToggleFavorite: (activityId: string) => void;
  favorites: string[];
}

const ActivityResults: React.FC<ActivityResultsProps> = ({ 
  onBookActivity, 
  onToggleFavorite, 
  favorites 
}) => {
  const [activities] = useState<Activity[]>(mockActivities);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'duration'>('price');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Culture', 'Détente', 'Aventure', 'Gastronomie'];

  const filteredActivities = activities.filter(activity => {
    if (filterCategory === 'all') return true;
    return activity.category === filterCategory;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Toutes catégories' : category}
              </option>
            ))}
          </select>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Trier par:</span>
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
      </div>

      {/* Results */}
      <div className="space-y-6">
        {sortedActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="md:flex">
              {/* Activity Image */}
              <div className="md:w-1/3">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              {/* Activity Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{activity.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{activity.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(activity.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {activity.rating} ({activity.reviews} avis)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(activity.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(activity.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(activity.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                {/* Activity Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{activity.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{activity.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Groupe</span>
                  </div>
                </div>

                {/* Included */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Inclus:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.included.map((item, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(activity.price)}
                    </p>
                    <p className="text-sm text-gray-500">par personne</p>
                  </div>
                  <button
                    onClick={() => onBookActivity(activity)}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
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

export default ActivityResults;