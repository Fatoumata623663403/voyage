import React from 'react';
import { Play, Star, Users, Award, Globe, TrendingUp, Shield, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec effet parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-indigo-900/90 z-10"></div>
        <img
          src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Voyage de rêve"
          className="w-full h-full object-cover"
        />
        {/* Overlay animé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-5"></div>
      </div>

      {/* Éléments flottants animés */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60 shadow-lg"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40 shadow-lg"></div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-purple-400 rounded-full opacity-50 shadow-lg"></div>
        </div>
        <div className="absolute top-60 left-1/3 animate-pulse delay-500">
          <div className="w-5 h-5 bg-pink-400 rounded-full opacity-30 shadow-lg"></div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge de confiance */}
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
          <Shield className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-white text-sm font-medium">Plateforme certifiée et sécurisée</span>
        </div>

        {/* Titre principal */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Voyagez avec
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Easy-Trip
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Découvrez le monde avec nos offres exclusives de vols, hôtels et expériences. 
            <br className="hidden md:block" />
            Votre prochaine aventure commence ici.
          </p>
        </div>

        {/* Statistiques impressionnantes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">2M+</div>
            <div className="text-blue-100 text-sm">Voyageurs satisfaits</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-blue-100 text-sm">Note moyenne</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-blue-100 text-sm">Destinations</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-100 text-sm">Support client</div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-gray-900 font-bold py-4 px-8 rounded-full hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Commencer mon voyage
          </button>
          
          <button className="flex items-center bg-white/20 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-full border border-white/30 hover:bg-white/30 transition-all hover:scale-105 shadow-lg">
            <Play className="w-5 h-5 mr-2" />
            Voir la vidéo
          </button>
        </div>

        {/* Badges de confiance */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Heart className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-white text-sm">Recommandé par 98% des clients</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Shield className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-white text-sm">Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white text-sm">Prix garantis</span>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;