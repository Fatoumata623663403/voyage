import React, { useState } from 'react';
import { Menu, X, User, Heart, Calendar, Search, Bell, Gift, Car, Camera, Package, Globe, CreditCard, HelpCircle, Settings, LogOut, Plane, Building } from 'lucide-react';
import { Link, Navigate } from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';






interface HeaderProps {
  onMenuToggle: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}



const Header: React.FC<HeaderProps> = ({ onMenuToggle, activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);




  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle();
  };

  


  const navItems = [
    { id: 'home', label: 'Accueil', icon: Search, color: 'text-blue-600' },
    { id: 'Vols', label: 'Vols', icon: Plane, color: 'text-sky-600' },
    { id: 'Hôtels', label: 'Hôtels', icon: Building, color: 'text-green-600' },
    { id: 'cars', label: 'Voitures', icon: Car, color: 'text-purple-600' },
    { id: 'activities', label: 'Activités', icon: Camera, color: 'text-orange-600' },
    { id: 'packages', label: 'Séjours', icon: Package, color: 'text-red-600' },
    { id: 'deals', label: 'Promotions', icon: Gift, color: 'text-pink-600' },
    
  ];

  const userMenuItems = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'bookings', label: 'Mes Réservations', icon: Calendar },
    { id: 'favorites', label: 'Mes Favoris', icon: Heart },
    { id: 'payment', label: 'Paiements', icon: CreditCard },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'chatSupports', label: 'Aide & Support', icon: HelpCircle },
  ];

  return (

    
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-70xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy-Trip
                </span>
                <div className="text-xs text-gray-500 -mt-">Votre voyage commence ici</div>
              </div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-blue-70 shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${activeSection === item.id ? item.color : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-3">
     

            {/* Notifications */}
            <button
              onClick={() => setActiveSection('notifications')}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* Favoris */}
            <button
              onClick={() => setActiveSection('favorites')}
              className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                activeSection === 'favorites'
                  ? 'bg-red-50 text-red-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${activeSection === 'favorites' ? 'text-red-600' : ''}`} />
              Favoris
            </button>

            {/* Réservations */}
            <button
              onClick={() => setActiveSection('bookings')}
              className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                activeSection === 'bookings'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar className={`w-4 h-4 mr-2 ${activeSection === 'bookings' ? 'text-green-600' : ''}`} />
              Réservations
            </button>
            

            

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span
                
                >Mon compte</span>
              </button>


                
              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-62 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-1 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Fatoumata Diariou Bah</p>
                    <p className="text-sm text-gray-500">bahfatoumatadiariou461@gmail.com</p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Etudiante chez Simplon/Guinée</span>
                    </div>
                  </div>
                  
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setActiveSection(item.id);
                                    setShowUserMenu(false);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Icon className="w-4 h-4 mr-3 text-gray-400" />
                                  {item.label}
                                </button>
                              );
                            
                           })}
                              <div className="border-t border-gray-100 mt-2 pt-2">
                                <button onClick={() => setActiveSection("home")}
                                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                  <LogOut className="w-4 h-4 mr-3" />
                                  Se déconnecter
                                </button>
                              </div>


                               {/* Boutons connexion / inscription */}
                                    <button
                              onClick={() => setActiveSection('login')}
                              className="px-7 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-all"
                            >
                              Se connecter
                            </button>

                            <button
                              onClick={() => setActiveSection('register')}
                              className="px-8 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all"
                            >
                              S’inscrire
                            </button>

                            <button onClick={() => setActiveSection("admin")}
                              className="px-28 py-2 text-sm font-medium text-white bg-blue-400 rounded-xl hover:bg-blue-100 transition-all">
                              Admin
                            </button>


                            <button onClick={() => setActiveSection("profile")}
                              className="px-28 py-2 text-sm font-medium text-white bg-blue-400 rounded-xl hover:bg-blue-100 transition-all">
                              user
                            </button>


                </div>
              )}
            </div>

          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="bg-gray-100 p-2 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-3 rounded-xl text-base font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${activeSection === item.id ? item.color : 'text-gray-400'}`} />
                    {item.label}
                  </button>
                );
              })}
              

              
              {/* Actions utilisateur mobile */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <button
                
                  onClick={() => {
                    setActiveSection('profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-5 h-5 mr-3 text-gray-400" />
                  Mon Profil
                </button>
                <button
                  onClick={() => {
                    setActiveSection('notifications');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Bell className="w-5 h-5 mr-3 text-gray-400" />
                  Notifications
                  {notifications > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
        )}
        
      </div>
    </header>
  );
  };


export default Header;