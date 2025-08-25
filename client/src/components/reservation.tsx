import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  MapPin,
  Users,
  Plane,
  Hotel,
  Clock,
  Phone,
  CreditCard,
  ArrowRight,
  Share2,
  Printer,
  Home,
} from "lucide-react";


export default function ReservationConfirmation() {
  const { bookingReference } = useParams<{ bookingReference: string }>();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - en production, ceci viendrait d'une API
  const mockReservation: Reservation = {
    id: "1",
    bookingReference: "WL123456ABC",
    type: "flight",
    status: "confirmed",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    primaryPassenger: {
      firstName: "Marie",
      lastName: "Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
    },
    passengers: [
      {
        firstName: "Marie",
        lastName: "Dubois",
        email: "marie.dubois@email.com",
        phone: "+33 6 12 34 56 78",
      },
      {
        firstName: "Pierre",
        lastName: "Dubois",
        email: "pierre.dubois@email.com",
        phone: "+33 6 87 65 43 21",
      },
    ],
    flights: [
      {
        id: "f1",
        airline: "Air France",
        flightNumber: "AF274",
        departure: {
          airport: "CDG",
          city: "Paris",
          country: "France",
          time: "08:30",
          date: "2024-03-15",
        },
        arrival: {
          airport: "NRT",
          city: "Tokyo",
          country: "Japon",
          time: "14:45",
          date: "2024-03-15",
        },
        duration: "12h 15m",
        class: "economy",
      },
    ],
    pricing: {
      basePrice: 1600,
      taxes: 289,
      fees: 50,
      total: 1939,
      currency: "EUR",
    },
    payment: {
      method: "card",
      status: "completed",
      transactionId: "TXN_123456789",
      paidAt: "2024-01-15T10:30:00Z",
    },
    contactEmail: "marie.dubois@email.com",
    contactPhone: "+33 6 12 34 56 78",
    notifications: {
      email: true,
      sms: true,
    },
  };

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      if (bookingReference === mockReservation.bookingReference) {
        setReservation(mockReservation);
      }
      setLoading(false);
    }, 1000);
  }, [bookingReference]);

  const handleDownloadTicket = () => {
    // Logique de téléchargement du billet
    console.log("Téléchargement du billet");
  };

  const handleSendEmail = () => {
    // Logique d'envoi par email
    console.log("Envoi par email");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Réservation ${reservation?.bookingReference}`,
        text: "Voici les détails de ma réservation",
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Réservation non trouvée
          </h1>
          <p className="text-gray-600 mb-6">
            La référence de réservation {bookingReference} n'existe pas.
          </p>
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with confirmation */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réservation confirmée !
          </h1>
          <p className="text-lg text-gray-600">
            Votre réservation {reservation.bookingReference} a été confirmée
            avec succès
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={handleDownloadTicket}>
            <Download className="w-4 h-4 mr-2" />
            Télécharger les billets
          </Button>
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="w-4 h-4 mr-2" />
            Envoyer par email
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>

        {/* Important info alert */}
        <Alert className="mb-6">
          <Mail className="w-4 h-4" />
          <AlertDescription>
            Un email de confirmation a été envoyé à{" "}
            <strong>{reservation.contactEmail}</strong>. Vérifiez également vos
            spams.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reservation details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="w-5 h-5 mr-2" />
                  Détails du vol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservation.flights?.map((flight) => (
                  <div key={flight.id}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {flight.airline}
                        </h3>
                        <p className="text-gray-600">
                          Vol {flight.flightNumber}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        Classe {flight.class === "economy" && "��conomique"}
                        {flight.class === "business" && "Affaires"}
                        {flight.class === "first" && "Première"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(flight.departure.date).toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </div>
                        <div className="font-medium">
                          {flight.departure.city}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.departure.airport}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm text-gray-600 mb-1">
                          {flight.duration}
                        </div>
                        <div className="w-full h-px bg-gray-300 relative">
                          <Plane className="w-4 h-4 text-gray-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Direct</div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(flight.arrival.date).toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </div>
                        <div className="font-medium">{flight.arrival.city}</div>
                        <div className="text-sm text-gray-600">
                          {flight.arrival.airport}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Passengers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Voyageurs ({reservation.passengers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservation.passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {passenger.firstName} {passenger.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {passenger.email}
                        </div>
                      </div>
                      <Badge variant="outline">Voyageur {index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Enregistrement</h4>
                    <p className="text-sm text-gray-600">
                      Présentez-vous à l'aéroport au moins 2 heures avant le
                      départ pour les vols internationaux.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Documents de voyage</h4>
                    <p className="text-sm text-gray-600">
                      N'oubliez pas votre passeport valide et vérifiez les
                      exigences de visa pour votre destination.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Besoin d'aide ?</h4>
                    <p className="text-sm text-gray-600">
                      Contactez notre service client au +33 1 23 45 67 89 ou par
                      email à support@wanderlust.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Référence de réservation
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {reservation.bookingReference}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">
                      {reservation.type === "flight" && "Vol"}
                      {reservation.type === "hotel" && "Hôtel"}
                      {reservation.type === "package" && "Séjour"}
                      {reservation.type === "activity" && "Activité"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <Badge className="bg-green-100 text-green-800">
                      Confirmée
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de réservation:</span>
                    <span className="font-medium">
                      {new Date(reservation.createdAt).toLocaleDateString(
                        "fr-FR",
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Détail des prix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Prix de base:</span>
                  <span>
                    {formatPrice(
                      reservation.pricing.basePrice,
                      reservation.pricing.currency,
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes:</span>
                  <span>
                    {formatPrice(
                      reservation.pricing.taxes,
                      reservation.pricing.currency,
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frais de service:</span>
                  <span>
                    {formatPrice(
                      reservation.pricing.fees,
                      reservation.pricing.currency,
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total payé:</span>
                  <span className="text-primary">
                    {formatPrice(
                      reservation.pricing.total,
                      reservation.pricing.currency,
                    )}
                  </span>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  Paiement effectué le{" "}
                  {reservation.payment.paidAt &&
                    new Date(reservation.payment.paidAt).toLocaleDateString(
                      "fr-FR",
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/reservations">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Voir toutes mes réservations
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Faire une nouvelle réservation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
