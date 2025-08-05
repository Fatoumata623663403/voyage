import React, { useState } from 'react';
import { Star, ThumbsUp, Filter, User } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  photos?: string[];
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  reviews, 
  averageRating, 
  totalReviews 
}) => {
  const [filterRating, setFilterRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.floor(r.rating) === rating).length,
    percentage: (reviews.filter(r => Math.floor(r.rating) === rating).length / reviews.length) * 100
  }));

  const filteredReviews = reviews.filter(review => 
    filterRating === 0 || Math.floor(review.rating) === filterRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Avis des voyageurs ({totalReviews})
      </h3>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
          <div className="flex items-center justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Basé sur {totalReviews} avis</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center">
              <span className="text-sm text-gray-600 w-8">{rating}★</span>
              <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Filter className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Filtrer par note:</span>
        </div>
        
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(parseInt(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded text-sm"
        >
          <option value={0}>Toutes les notes</option>
          {[5, 4, 3, 2, 1].map(rating => (
            <option key={rating} value={rating}>{rating} étoiles</option>
          ))}
        </select>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Trier par:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="recent">Plus récents</option>
            <option value="helpful">Plus utiles</option>
            <option value="rating">Note</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.slice(0, 5).map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900 mr-2">{review.userName}</h4>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Vérifié
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(review.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
            <p className="text-gray-700 mb-3">{review.comment}</p>

            {review.photos && review.photos.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {review.photos.slice(0, 3).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Photo de l'avis"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
              <ThumbsUp className="w-4 h-4 mr-1" />
              Utile ({review.helpful})
            </button>
          </div>
        ))}
      </div>

      {sortedReviews.length > 5 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Voir tous les avis ({sortedReviews.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;