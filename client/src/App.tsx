import React, { useState } from 'react';
import { Flight, Hotel, CarRental, Activity, Package, Booking } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchForm from './components/SearchForm';
import DestinationGallery from './components/DestinationGallery';
import InspirationSection from './components/InspirationSection';
import PromotionsSection from './components/PromotionsSection';
import FlightResults from './components/FlightResults';
import HotelResults from './components/HotelResults';
import CarRentalResults from './components/CarRentalResults';
import ActivityResults from './components/ActivityResults';
import PackageResults from './components/PackageResults';
import BookingModal from './components/BooKingModal';
import BookingHistory from './components/BooKingHistory';
import UserProfile from './components/UserProfile';
import Favorites from './components/Favorites';
import NotificationCenter from './components/NotificationCenter';
import PriceComparison from './components/PriceComparison';
import ReviewsSection from './components/ReviewsSection';
import MapView from './components/MapView';
import TravelInsights from './components/TravelInsights';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import ChatSupport from './components/ChatSupport';
import LoyaltyProgram from './components/LoyaltyProgram';
import FlightSearchForm from './components/FlightSearchForm';


function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchResults, setSearchResults] = useState<{
    type: 'flight' | 'hotel' | 'car' | 'activity' | 'package' | null;
    data: Flight[] | Hotel[] | CarRental[] | Activity[] | Package[] | null;
    destination?: string;
  }>({ type: null, data: null });
  
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    item: Flight | Hotel | CarRental | Activity | Package | null;
    type: 'flight' | 'hotel' | 'car' | 'activity' | 'package';
  }>({ isOpen: false, item: null, type: 'flight' });

  const [authModal, setAuthModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; amount: number }>({ isOpen: false, amount: 0 });
  const [notificationCenter, setNotificationCenter] = useState(false);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Local storage hooks
  const [bookings, setBookings] = useLocalStorage<Booking[]>('easyTripBookings', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('easyTripFavorites', []);
  const [user, setUser] = useLocalStorage('easyTripUser', {
    name: 'Fatoumata Diariou Bah',
    email: 'bahfatoumatadiariou461@gmail.com',
    phone: '+224 623 66 34 03',
    loyaltyPoints: 1250,
    membershipLevel: 'gold'
  });

  // Mock data for new components
  const mockReviews = [
    {
      id: '1',
      userName: 'Marie L.',
      rating: 5,
      date: '2024-03-01',
      title: 'Séjour parfait !',
      comment: 'Hôtel magnifique avec un service exceptionnel. La vue depuis la chambre était à couper le souffle.',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userName: 'Pierre M.',
      rating: 4,
      date: '2024-02-28',
      title: 'Très bon rapport qualité-prix',
      comment: 'Bien situé, personnel accueillant. Petit-déjeuner copieux. Juste un peu bruyant côté rue.',
      helpful: 8,
      verified: true
    }
  ];

  const mockPriceData = {
    currentPrice: 450,
    historicalPrices: [420, 435, 460, 445, 450, 465, 440, 455, 450],
    competitors: [
      { name: 'Booking.com', price: 465 },
      { name: 'Expedia', price: 455 },
      { name: 'Hotels.com', price: 470 }
    ]
  };

  const handleSearch = (searchData: any) => {
    setSearchResults({ 
      type: searchData.type, 
      data: [], 
      destination: searchData.to || searchData.destination 
    });
    setActiveSection('search-results');
  };

  const handleDestinationSelect = (destination: string) => {
    setActiveSection('home');
    setTimeout(() => {
      const searchElement = document.getElementById('search-form');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBookFlight = (flight: Flight) => {
    setBookingModal({ isOpen: true, item: flight, type: 'flight' });
  };

  const handleBookHotel = (hotel: Hotel) => {
    setBookingModal({ isOpen: true, item: hotel, type: 'hotel' });
  };

  const handleBookCar = (car: CarRental) => {
    setBookingModal({ isOpen: true, item: car, type: 'car' });
  };

  const handleBookActivity = (activity: Activity) => {
    setBookingModal({ isOpen: true, item: activity, type: 'activity' });
  };

  const handleBookPackage = (pkg: Package) => {
    setBookingModal({ isOpen: true, item: pkg, type: 'package' });
  };

  const handleConfirmBooking = (booking: Booking) => {
    setPaymentModal({ isOpen: true, amount: booking.totalPrice });
    setBookingModal({ isOpen: false, item: null, type: 'flight' });
  };

  function generateConfirmationNumber(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for(let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


  const handlePaymentSuccess = () => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      type: bookingModal.type,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      details: bookingModal.item!,
      totalPrice: paymentModal.amount,

      
    travelDate: "2025-08-01",         // À adapter dynamiquement selon ta data
    currency: "EUR",                  // Ou selon la monnaie de l'utilisateur
    paymentMethod: "Credit Card",     // Ou autre méthode, à adapter
    confirmationNumber: generateConfirmationNumber(),  // Fonction à créer pour générer un code unique
    };
    setBookings(prev => [...prev, newBooking]);
    setActiveSection('bookings');
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleUpdateUser = (userData: any) => {
    setUser(userData);
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Login:', credentials);
    // Simulation de connexion
  };

  const handleRegister = (userData: { name: string; email: string; password: string }) => {
    console.log('Register:', userData);
    // Simulation d'inscription
  };

  const handleMenuToggle = () => {
    // Handle mobile menu toggle if needed
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-0">
            <HeroSection />
            
            <div className="relative -mt-32 z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div id="search-form">
                  <SearchForm onSearch={handleSearch} />
                </div>
              </div>
            </div>

            <DestinationGallery onDestinationSelect={handleDestinationSelect} />
            <InspirationSection />
            <PromotionsSection />

            {/* Enhanced Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir Easy-Trip ?
                </h2>
                <p className="text-xl text-gray-600">
                  La plateforme de voyage la plus complète et innovante
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Comparaison de prix intelligente
                  </h3>
                  <p className="text-gray-600">
                    Comparez les prix en temps réel avec l'historique et les tendances du marché
                  </p>
                </div>

                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cartes interactives
                  </h3>
                  <p className="text-gray-600">
                    Visualisez vos options sur des cartes détaillées avec les prix et disponibilités
                  </p>
                </div>

                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Avis vérifiés
                  </h3>
                  <p className="text-gray-600">
                    Consultez des milliers d'avis authentiques de voyageurs vérifiés
                  </p>
                  
                </div>

                
                <div className="text-center  p- bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-96 h-7 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Créer par Fatoumata Diariou Bah 2025
                  </h3>
                  
                  
                </div>
                
              </div>
            </div>
          </div>
        );

      case 'search-results':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={() => setActiveSection('home')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                ← Retour à la recherche
              </button>
              
              {/* Enhanced toolbar */}
              <div className="flex items-center space-x-4">
                {searchResults.type === 'hotel' && (
                  <>
                    <button
                      onClick={() => setShowMap(!showMap)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        showMap ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {showMap ? 'Liste' : 'Carte'}
                    </button>
                    <button
                      onClick={() => setShowPriceComparison(!showPriceComparison)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        showPriceComparison ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Prix
                    </button>
                    <button
                      onClick={() => setShowReviews(!showReviews)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        showReviews ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Avis
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {searchResults.type === 'flight' && (
                  <FlightResults
                    onBookFlight={handleBookFlight}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                )}
                {searchResults.type === 'hotel' && !showMap && (
                  <HotelResults
                    onBookHotel={handleBookHotel}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                )}
                {searchResults.type === 'hotel' && showMap && (
                  <MapView />
                )}
                {searchResults.type === 'car' && (
                  <CarRentalResults
                    onBookCar={handleBookCar}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                )}
                {searchResults.type === 'activity' && (
                  <ActivityResults
                    onBookActivity={handleBookActivity}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                )}
                {searchResults.type === 'package' && (
                  <PackageResults
                    onBookPackage={handleBookPackage}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                )}
              </div>

              <div className="space-y-6">
                {searchResults.destination && (
                  <TravelInsights destination={searchResults.destination} />
                )}
                
                {showPriceComparison && (
                  <PriceComparison
                    currentPrice={mockPriceData.currentPrice}
                    historicalPrices={mockPriceData.historicalPrices}
                    competitors={mockPriceData.competitors}
                  />
                )}
                
                {showReviews && (
                  <ReviewsSection
                    reviews={mockReviews}
                    averageRating={4.5}
                    totalReviews={156}
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 'cars':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location de Voitures</h2>
            <CarRentalResults
              onBookCar={handleBookCar}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        );

      case 'activities':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activités & Excursions</h2>
            <ActivityResults
              onBookActivity={handleBookActivity}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        );

      case 'packages':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Séjours Organisés</h2>
            <PackageResults
              onBookPackage={handleBookPackage}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        );

      case 'deals':
        return (
          <div className="py-8">
            <PromotionsSection />
          </div>
        );

      case 'bookings':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BookingHistory bookings={bookings} />
          </div>
        );

      case 'favorites':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Favorites
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UserProfile
                user={user}
                onUpdateUser={handleUpdateUser}
              />
              <LoyaltyProgram user={user} />
            </div>
          </div>
        );

      case 'notifications':
        setNotificationCenter(true);
        setActiveSection('home');
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuToggle={handleMenuToggle}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main>
        {renderContent()}
      </main>

    <BookingModal
  isOpen={bookingModal.isOpen}
  onClose={() => setBookingModal({ isOpen: false, item: null, type: 'flight' })}
  item={bookingModal.item}
  type={bookingModal.type}
  onConfirmBooking={handleConfirmBooking}
  userId={user?.email}  // <-- ajoute cette ligne
/>


      <AuthModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, amount: 0 })}
        amount={paymentModal.amount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <NotificationCenter
        isOpen={notificationCenter}
        onClose={() => setNotificationCenter(false)}
      />

      <ChatSupport />
    </div>
  );
}

export default App;