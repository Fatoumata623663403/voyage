import React from 'react';
import { Tag, Clock, ArrowRight } from 'lucide-react';
import { mockPromotions } from '../utils/mockData';

const PromotionsSection: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Offres Spéciales
          </h2>
          <p className="text-xl text-gray-600">
            Profitez de nos promotions exceptionnelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockPromotions.map((promo) => (
            <div
              key={promo.id}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute top-4 right-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  -{promo.discount}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                <p className="text-lg mb-4 opacity-90">{promo.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Valable jusqu'au {new Date(promo.validUntil).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
                    <Tag className="w-4 h-4 mr-2" />
                    <span className="font-medium">Voir l'offre</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionsSection;