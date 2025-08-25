import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  CreditCard,
  Eye,
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Plane,
  Hotel,
  Mountain,
  Camera,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";




export default function ReservationHistory() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all-status");
  const [typeFilter, setTypeFilter] = useState<string>("all-types");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Mock data - similaire à celle de ReservationManagement
  const mockReservations: Reservation[] = [
    {
      id: "1",
      bookingReference: "WL123456ABC",
      type: "flight",
      status: "completed",
      createdAt: "2023-12-15T10:30:00Z",
      updatedAt: "2023-12-15T10:30:00Z",
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
            date: "2023-12-20",
          },
          arrival: {
            airport: "FCO",
            city: "Rome",
            country: "Italie",
            time: "10:45",
            date: "2023-12-20",
          },
          duration: "2h 15m",
          class: "economy",
        },
      ],
      pricing: {
        basePrice: 280,
        taxes: 89,
        fees: 25,
        total: 394,
        currency: "EUR",
      },
      payment: {
        method: "card",
        status: "completed",
        transactionId: "TXN_987654321",
        paidAt: "2023-12-15T10:30:00Z",
      },
      contactEmail: "marie.dubois@email.com",
      contactPhone: "+33 6 12 34 56 78",
      notifications: {
        email: true,
        sms: true,
      },
    },
    {
      id: "2",
      bookingReference: "WL789012DEF",
      type: "hotel",
      status: "completed",
      createdAt: "2023-10-10T14:15:00Z",
      updatedAt: "2023-10-10T14:15:00Z",
      primaryPassenger: {
        firstName: "Jean",
        lastName: "Martin",
        email: "jean.martin@email.com",
        phone: "+33 6 98 76 54 32",
      },
      passengers: [
        {
          firstName: "Jean",
          lastName: "Martin",
          email: "jean.martin@email.com",
          phone: "+33 6 98 76 54 32",
        },
      ],
      hotel: {
        id: "h1",
        hotelName: "Hotel del Mar",
        address: "Av. de la Playa, Barcelona",
        city: "Barcelone",
        country: "Espagne",
        checkIn: "2023-10-15",
        checkOut: "2023-10-20",
        nights: 5,
        roomType: "Chambre vue mer",
        guestCount: 2,
        amenities: ["WiFi", "Piscine", "Petit-déjeuner"],
        rating: 4.3,
      },
      pricing: {
        basePrice: 450,
        taxes: 45,
        fees: 15,
        total: 510,
        currency: "EUR",
      },
      payment: {
        method: "card",
        status: "completed",
        transactionId: "TXN_456789123",
        paidAt: "2023-10-10T14:15:00Z",
      },
      contactEmail: "jean.martin@email.com",
      contactPhone: "+33 6 98 76 54 32",
      notifications: {
        email: true,
        sms: false,
      },
    },
    {
      id: "3",
      bookingReference: "WL345678GHI",
      type: "package",
      status: "cancelled",
      createdAt: "2023-08-05T09:20:00Z",
      updatedAt: "2023-08-07T12:00:00Z",
      primaryPassenger: {
        firstName: "Sophie",
        lastName: "Laurent",
        email: "sophie.laurent@email.com",
        phone: "+33 6 55 44 33 22",
      },
      passengers: [
        {
          firstName: "Sophie",
          lastName: "Laurent",
          email: "sophie.laurent@email.com",
          phone: "+33 6 55 44 33 22",
        },
        {
          firstName: "Marc",
          lastName: "Laurent",
          email: "marc.laurent@email.com",
          phone: "+33 6 11 22 33 44",
        },
      ],
      pricing: {
        basePrice: 1200,
        taxes: 150,
        fees: 50,
        total: 1400,
        currency: "EUR",
      },
      payment: {
        method: "card",
        status: "refunded",
      },
      contactEmail: "sophie.laurent@email.com",
      contactPhone: "+33 6 55 44 33 22",
      notifications: {
        email: true,
        sms: true,
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setReservations(mockReservations);
      setFilteredReservations(mockReservations);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...reservations];

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.bookingReference
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          reservation.primaryPassenger.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          reservation.primaryPassenger.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Filtrer par statut
    if (statusFilter && statusFilter !== "all-status") {
      filtered = filtered.filter(
        (reservation) => reservation.status === statusFilter,
      );
    }

    // Filtrer par type
    if (typeFilter && typeFilter !== "all-types") {
      filtered = filtered.filter(
        (reservation) => reservation.type === typeFilter,
      );
    }

    // Trier
    switch (sortBy) {
      case "date-desc":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "date-asc":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "price-desc":
        filtered.sort((a, b) => b.pricing.total - a.pricing.total);
        break;
      case "price-asc":
        filtered.sort((a, b) => a.pricing.total - b.pricing.total);
        break;
    }

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, typeFilter, sortBy, reservations]);

  const getTypeIcon = (type: ReservationType) => {
    switch (type) {
      case "flight":
        return <Plane className="w-4 h-4" />;
      case "hotel":
        return <Hotel className="w-4 h-4" />;
      case "package":
        return <Mountain className="w-4 h-4" />;
      case "activity":
        return <Camera className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Historique des Réservations
          </h1>
          <p className="text-gray-600">
            Consultez l'historique de toutes vos réservations passées
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={statusFilter || "all-status"}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter || "all-types"}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">Tous les types</SelectItem>
                  <SelectItem value="flight">Vol</SelectItem>
                  <SelectItem value="hotel">Hôtel</SelectItem>
                  <SelectItem value="package">Séjour</SelectItem>
                  <SelectItem value="activity">Activité</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Plus récent</SelectItem>
                  <SelectItem value="date-asc">Plus ancien</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all-status");
                  setTypeFilter("all-types");
                  setSortBy("date-desc");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {reservations.length}
              </div>
              <div className="text-sm text-gray-600">Total réservations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {reservations.filter((r) => r.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Terminées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {reservations.filter((r) => r.status === "cancelled").length}
              </div>
              <div className="text-sm text-gray-600">Annulées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(
                  reservations
                    .filter((r) => r.status === "completed")
                    .reduce((total, r) => total + r.pricing.total, 0),
                )}
              </div>
              <div className="text-sm text-gray-600">Total dépensé</div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune réservation trouvée
                </h3>
                <p className="text-gray-600 mb-4">
                  Aucune réservation ne correspond à vos critères.
                </p>
                <Button asChild>
                  <Link to="/">Faire une nouvelle réservation</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredReservations.map((reservation) => (
              <Card
                key={reservation.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(reservation.type)}
                          <span className="font-semibold text-gray-900">
                            {reservation.bookingReference}
                          </span>
                        </div>
                        <Badge
                          className={cn(
                            "flex items-center space-x-1",
                            getReservationStatusColor(reservation.status),
                          )}
                        >
                          {getStatusIcon(reservation.status)}
                          <span>
                            {getReservationStatusText(reservation.status)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary">
                          {formatPrice(
                            reservation.pricing.total,
                            reservation.pricing.currency,
                          )}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardExpansion(reservation.id)}
                        >
                          {expandedCard === reservation.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Date de réservation
                        </div>
                        <div className="font-medium">
                          {new Date(reservation.createdAt).toLocaleDateString(
                            "fr-FR",
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          Destination
                        </div>
                        <div className="font-medium">
                          {reservation.flights?.[0]?.arrival.city ||
                            reservation.hotel?.city ||
                            "Non spécifiée"}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Paiement
                        </div>
                        <div className="font-medium">
                          {reservation.payment.status === "completed" && "Payé"}
                          {reservation.payment.status === "pending" &&
                            "En attente"}
                          {reservation.payment.status === "refunded" &&
                            "Remboursé"}
                          {reservation.payment.status === "failed" && "Échoué"}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedCard === reservation.id && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          {/* Flight Details */}
                          {reservation.flights && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Détails du vol
                              </h4>
                              {reservation.flights.map((flight) => (
                                <div
                                  key={flight.id}
                                  className="p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-600">
                                        Départ:{" "}
                                      </span>
                                      <span className="font-medium">
                                        {flight.departure.city} (
                                        {flight.departure.airport}) -{" "}
                                        {flight.departure.time}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">
                                        Arrivée:{" "}
                                      </span>
                                      <span className="font-medium">
                                        {flight.arrival.city} (
                                        {flight.arrival.airport}) -{" "}
                                        {flight.arrival.time}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">
                                        Durée:{" "}
                                      </span>
                                      <span className="font-medium">
                                        {flight.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Hotel Details */}
                          {reservation.hotel && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Détails de l'hôtel
                              </h4>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">
                                      Hôtel:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {reservation.hotel.hotelName}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Chambre:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {reservation.hotel.roomType}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Check-in:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {new Date(
                                        reservation.hotel.checkIn,
                                      ).toLocaleDateString("fr-FR")}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Check-out:{" "}
                                    </span>
                                    <span className="font-medium">
                                      {new Date(
                                        reservation.hotel.checkOut,
                                      ).toLocaleDateString("fr-FR")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link
                                to={`/reservation/confirmation/${reservation.bookingReference}`}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Voir détails
                              </Link>
                            </Button>
                            {reservation.status === "completed" && (
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination info */}
        {filteredReservations.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Affichage de {filteredReservations.length} réservation
              {filteredReservations.length > 1 ? "s" : ""} sur{" "}
              {reservations.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
