import React, { useState } from 'react';
import AdminDashboard from '../components/admin/AdminDashbord';

import { User, Booking, Package } from '../types';
import AdminLayout from "../components/admin/AdminLayout"; 


const AdminPage: React.FC = () => {
  // 📊 Données mock
  const [users, setUsers] = useState<User[]>([
    { _id: 'u1', name: 'Fatoumata Bah', email: 'fatou@example.com', phone: '+224623663403', preferences: { currency: 'EUR', language: 'fr', notifications: { email: true, push: true, sms: true }, travelPreferences: { seatPreference: 'window', mealPreference: 'veg', roomPreference: 'double' } }, bookings: [], favorites: [], loyaltyPoints: 1200, membershipLevel: 'gold', paymentMethods: [] },
    { _id: 'u2', name: 'John Doe', email: 'john@example.com', phone: '+224123456789', preferences: { currency: 'USD', language: 'en', notifications: { email: true, push: false, sms: true }, travelPreferences: { seatPreference: 'aisle', mealPreference: 'non-veg', roomPreference: 'single' } }, bookings: [], favorites: [], loyaltyPoints: 500, membershipLevel: 'silver', paymentMethods: [] },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'b1', userId: 'u1', type: 'flight', status: 'confirmed', bookingDate: '2025-01-01', travelDate: '2025-08-01', details: { id: 'f1', airline: 'Air France', airlineCode: 'AF', flightNumber: 'AF123', departure: { airport: 'CDG', airportCode: 'CDG', city: 'Paris', country: 'France', time: '10:00', date: '2025-08-01' }, arrival: { airport: 'JFK', airportCode: 'JFK', city: 'New York', country: 'USA', time: '13:00', date: '2025-08-01' }, duration: '8h', price: 450, stops: 0, aircraft: 'Boeing 777', class: 'economy', baggage: { cabin: '7kg', checked: '23kg' }, amenities: ['wifi'], cancellationPolicy: 'Flexible', changePolicy: 'Allowed', mealService: true, wifiAvailable: true, seatSelection: true, carbonEmission: 300 }, passengers: [], totalPrice: 450, currency: 'EUR', paymentMethod: 'Credit Card', confirmationNumber: 'ABC12345' },
  ]);

  const [packages, setPackages] = useState<Package[]>([
    { id: 'p1', title: 'Séjour Paris', destination: 'Paris', destinations: ['Paris'], duration: '5 jours', price: 1200, originalPrice: 1500, image: '', images: [], includes: ['vol', 'hôtel'], excludes: ['repas'], highlights: ['Tour Eiffel'], itinerary: [], rating: 4.5, reviews: 120, difficulty: 'easy', bestTime: 'Avril', groupSize: { min: 1, max: 4 }, cancellationPolicy: 'Flexible' }
  ]);

  // 🔄 Fonctions de gestion
  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
  };

  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDeletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // 🔢 Section active
  const [activeSection, setActiveSection] = useState<'dashboard' | 'users' | 'bookings' | 'packages' | 'payments' | 'support'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex mb-6 space-x-4">
        <button className={`px-4 py-2 rounded ${activeSection === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('dashboard')}>Dashboard</button>
        <button className={`px-4 py-2 rounded ${activeSection === 'users' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('users')}>Utilisateurs</button>
        <button className={`px-4 py-2 rounded ${activeSection === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('bookings')}>Réservations</button>
        <button className={`px-4 py-2 rounded ${activeSection === 'packages' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('packages')}>Séjours</button>
        <button className={`px-4 py-2 rounded ${activeSection === 'payments' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('payments')}>Paiements</button>
        <button className={`px-4 py-2 rounded ${activeSection === 'support' ? 'bg-blue-600 text-white' : 'bg-white shadow'}`} onClick={() => setActiveSection('support')}>Support</button>
      </div>


      <AdminDashboard
        section={activeSection}
        users={users}
        bookings={bookings}
        packages={packages}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeletePackage={handleDeletePackage}
      />
    </div>
  );
};

export default AdminPage;
