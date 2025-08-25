import React, { useEffect, useState, useContext } from 'react';
import { Booking } from "../types"
import {
  Calendar,
  MapPin,
  Plane,
  Building,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

interface BookingHistoryProps {
   bookings: Booking[];
    userId: string;
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:000/api/bookings/user/${userId}`);
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
        <p className="text-gray-500">
          Vos réservations apparaîtront ici une fois que vous aurez effectué vos premiers achats.
        </p>
        
      </div>

      
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mes Réservations</h2>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {booking.type === 'flight' ? (
                  <Plane className="w-6 h-6 text-blue-600 mr-3" />
                ) : (
                  <Building className="w-6 h-6 text-green-600 mr-3" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {booking.type === 'flight'
                      ? (booking.details as any)?.airline
                      : (booking.details as any)?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Réservé le {new Date(booking.bookingDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusIcon(booking.status)}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {getStatusText(booking.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {booking.type === 'flight' ? (
                <>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Départ</p>
                      <p className="font-medium">
                        {(booking.details as any)?.departure?.city} - {(booking.details as any)?.departure?.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Arrivée</p>
                      <p className="font-medium">
                        {(booking.details as any)?.arrival?.city} - {(booking.details as any)?.arrival?.time}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Hôtel</p>
                      <p className="font-medium">{(booking.details as any)?.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Séjour</p>
                      <p className="font-medium">Du 15/03 au 18/03</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">
                  {booking.type === 'flight'
                    ? `${booking.passengers?.length ?? 0}`

                    : 'Chambre standard'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                <p className="text-sm text-gray-500">
                  {booking.type === 'flight' ? 'Total' : 'Par nuit'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
