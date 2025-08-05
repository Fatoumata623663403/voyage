import { Flight, Hotel, CarRental, Activity, Package, Destination, Review, TravelTip } from '../types';

export const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air France',
    airlineCode: 'AF',
    flightNumber: 'AF347',
    departure: {
      airport: 'Charles de Gaulle',
      airportCode: 'CDG',
      city: 'Paris',
      country: 'France',
      time: '08:30',
      date: '2024-03-15',
      terminal: '2E',
      gate: 'K12'
    },
    arrival: {
      airport: 'John F. Kennedy',
      airportCode: 'JFK',
      city: 'New York',
      country: 'USA',
      time: '14:45',
      date: '2024-03-15',
      terminal: '1',
      gate: 'B6'
    },
    duration: '8h 15m',
    price: 650,
    originalPrice: 750,
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    class: 'economy',
    baggage: {
      cabin: '8kg inclus',
      checked: '23kg inclus'
    },
    amenities: ['WiFi gratuit', 'Repas inclus', 'Divertissement', 'USB/Prise'],
    cancellationPolicy: 'Remboursable avec frais',
    changePolicy: 'Modifiable avec frais',
    mealService: true,
    wifiAvailable: true,
    seatSelection: true,
    carbonEmission: 0.92
  },
  {
    id: '2',
    airline: 'Lufthansa',
    airlineCode: 'LH',
    flightNumber: 'LH441',
    departure: {
      airport: 'Charles de Gaulle',
      airportCode: 'CDG',
      city: 'Paris',
      country: 'France',
      time: '12:15',
      date: '2024-03-15',
      terminal: '1',
      gate: 'A23'
    },
    arrival: {
      airport: 'John F. Kennedy',
      airportCode: 'JFK',
      city: 'New York',
      country: 'USA',
      time: '20:30',
      date: '2024-03-15',
      terminal: '1',
      gate: 'B12'
    },
    duration: '10h 15m',
    price: 580,
    stops: 1,
    stopDetails: [{
      airport: 'Frankfurt',
      city: 'Frankfurt',
      duration: '1h 45m'
    }],
    aircraft: 'Airbus A330-300',
    class: 'economy',
    baggage: {
      cabin: '8kg inclus',
      checked: '23kg inclus'
    },
    amenities: ['WiFi payant', 'Repas inclus', 'Divertissement'],
    cancellationPolicy: 'Non remboursable',
    changePolicy: 'Modifiable avec frais',
    mealService: true,
    wifiAvailable: false,
    seatSelection: true,
    carbonEmission: 1.15
  },
  {
    id: '3',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK73',
    departure: {
      airport: 'Charles de Gaulle',
      airportCode: 'CDG',
      city: 'Paris',
      country: 'France',
      time: '22:00',
      date: '2024-03-15',
      terminal: '2C',
      gate: 'M15'
    },
    arrival: {
      airport: 'John F. Kennedy',
      airportCode: 'JFK',
      city: 'New York',
      country: 'USA',
      time: '06:30',
      date: '2024-03-16',
      terminal: '4',
      gate: 'A2'
    },
    duration: '12h 30m',
    price: 1250,
    originalPrice: 1450,
    stops: 1,
    stopDetails: [{
      airport: 'Dubai International',
      city: 'Dubai',
      duration: '2h 15m'
    }],
    aircraft: 'Boeing 777-300ER',
    class: 'business',
    baggage: {
      cabin: '12kg inclus',
      checked: '32kg inclus'
    },
    amenities: ['WiFi gratuit', 'Repas gastronomique', 'Siège-lit', 'Salon VIP', 'Chauffeur'],
    cancellationPolicy: 'Remboursable',
    changePolicy: 'Modifiable gratuitement',
    mealService: true,
    wifiAvailable: true,
    seatSelection: true,
    carbonEmission: 1.85
  }
];

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'The Plaza Hotel',
    location: 'Manhattan, New York',
    address: '768 5th Ave, New York, NY 10019',
    coordinates: { lat: 40.7648, lng: -73.9754 },
    rating: 4.8,
    starRating: 5,
    price: 450,
    originalPrice: 550,
    currency: 'EUR',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi gratuit', 'Spa', 'Restaurant', 'Gym', 'Piscine', 'Room Service 24h', 'Concierge', 'Parking'],
    description: 'Hôtel de luxe au cœur de Manhattan avec des chambres élégantes et un service de classe mondiale. Vue imprenable sur Central Park.',
    reviews: 2847,
    reviewScore: 9.2,
    roomType: 'Chambre Deluxe avec vue parc',
    roomSize: 35,
    bedType: 'Lit King Size',
    maxGuests: 2,
    cancellation: 'Annulation gratuite jusqu\'à 24h avant',
    breakfast: true,
    freeCancellation: true,
    payAtProperty: false,
    instantBooking: true,
    distanceFromCenter: 0.5,
    nearbyAttractions: ['Central Park', 'Times Square', 'Broadway', 'MoMA'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    policies: {
      checkIn: 'Pièce d\'identité requise',
      checkOut: 'Libération avant 12h00',
      cancellation: 'Gratuite jusqu\'à 24h avant',
      children: 'Enfants bienvenus',
      pets: 'Animaux non autorisés'
    }
  },
  {
    id: '2',
    name: 'Central Park Hotel',
    location: 'Upper East Side, New York',
    address: '870 7th Ave, New York, NY 10019',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    rating: 4.6,
    starRating: 4,
    price: 320,
    originalPrice: 380,
    currency: 'EUR',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi gratuit', 'Restaurant', 'Bar', 'Concierge', 'Gym', 'Business Center'],
    description: 'Hôtel boutique avec vue sur Central Park, alliant équipements modernes et charme classique new-yorkais.',
    reviews: 1523,
    reviewScore: 8.7,
    roomType: 'Chambre Standard',
    roomSize: 28,
    bedType: 'Lit Queen Size',
    maxGuests: 2,
    cancellation: 'Annulation 48h avant',
    breakfast: false,
    freeCancellation: false,
    payAtProperty: true,
    instantBooking: false,
    distanceFromCenter: 1.2,
    nearbyAttractions: ['Central Park', 'Metropolitan Museum', 'Guggenheim'],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    policies: {
      checkIn: 'Carte de crédit requise',
      checkOut: 'Libération avant 11h00',
      cancellation: 'Frais après 48h',
      children: 'Enfants bienvenus',
      pets: 'Animaux sur demande'
    }
  }
];



export const mockCarRentals: CarRental[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'Série 3',
    category: 'Berline Premium',
    company: 'BMW Rent',
    pricePerDay: 85,
    price: 85, 
    luggage: 2, 
    originalPrice: 95,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['GPS', 'Climatisation', 'Bluetooth', 'Sièges cuir', 'Caméra recul', 'Régulateur vitesse'],
    transmission: 'automatic',
    fuel: 'Essence',
    seats: 5,
    doors: 4,
    airConditioning: true,
    location: 'Aéroport CDG',
    pickupLocations: ['Aéroport CDG', 'Gare du Nord', 'Centre-ville Paris'],
    mileage: 'unlimited',
    insurance: ['Assurance tous risques', 'Vol et incendie', 'Bris de glace'],
    minimumAge: 25,
    deposit: 500,
    cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant'
  },
  {
    id: '2',
    brand: 'Volkswagen',
    model: 'Golf',
    category: 'Compacte',
    company: 'Volkswagen Rent',
    pricePerDay: 45,
    price: 45,
    luggage: 1,
    originalPrice: 55,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['GPS', 'Climatisation', 'Bluetooth', 'USB'],
    transmission: 'manual',
    fuel: 'Diesel',
    seats: 5,
    doors: 5,
    airConditioning: true,
    location: 'Centre-ville Paris',
    pickupLocations: ['Centre-ville Paris', 'Gare de Lyon'],
    mileage: 'limited',
    insurance: ['Assurance tiers', 'Vol et incendie'],
    minimumAge: 21,
    deposit: 300,
    cancellationPolicy: 'Frais d\'annulation après 48h'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Tour Eiffel - Visite guidée avec accès sommet',
    location: 'Paris, France',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    price: 35,
    originalPrice: 45,
    duration: '2h 30m',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Découvrez l\'histoire fascinante de la Tour Eiffel avec un guide expert et profitez d\'une vue panoramique sur Paris depuis le sommet.',
    category: 'Culture',
    included: ['Guide professionnel', 'Accès prioritaire', 'Audio-guide', 'Accès au sommet'],
    excluded: ['Transport', 'Repas', 'Photos souvenirs'],
    reviews: 1245,
    difficulty: 'easy',
    groupSize: { min: 1, max: 25 },
    languages: ['Français', 'Anglais', 'Espagnol', 'Italien'],
    ageRestriction: 'Tous âges',
    cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant',
    meetingPoint: 'Pilier Sud de la Tour Eiffel',
    whatToBring: ['Chaussures confortables', 'Appareil photo', 'Veste (sommet venteux)']
  },
  {
    id: '2',
    title: 'Croisière sur la Seine avec dîner gastronomique',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    price: 89,
    originalPrice: 110,
    duration: '3h',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Admirez Paris depuis la Seine avec cette croisière romantique accompagnée d\'un dîner gastronomique français.',
    category: 'Détente',
    included: ['Croisière 3h', 'Dîner 4 services', 'Vin inclus', 'Commentaires audio'],
    excluded: ['Transport vers embarcadère', 'Pourboires'],
    reviews: 892,
    difficulty: 'easy',
    groupSize: { min: 2, max: 150 },
    languages: ['Français', 'Anglais'],
    ageRestriction: 'Tous âges bienvenus',
    cancellationPolicy: 'Annulation avec frais après 48h',
    meetingPoint: 'Port de la Bourdonnais',
    whatToBring: ['Tenue élégante recommandée', 'Appareil photo']
  }
];

export const mockPackages: Package[] = [
  {
    id: '1',
    title: 'Paris Romantique - Escapade de charme',
    destination: 'Paris, France',
    destinations: ['Paris'],
    duration: '3 jours / 2 nuits',
    price: 599,
    originalPrice: 799,
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    includes: ['Hôtel 4* centre-ville', 'Petit-déjeuner', 'Visite guidée', 'Transferts aéroport', 'Croisière Seine'],
    excludes: ['Vols', 'Déjeuners et dîners', 'Assurance voyage', 'Dépenses personnelles'],
    highlights: ['Tour Eiffel', 'Musée du Louvre', 'Montmartre', 'Croisière Seine', 'Champs-Élysées'],
    itinerary: [
      {
        day: 1,
        title: 'Arrivée et découverte',
        description: 'Accueil à l\'aéroport et installation à l\'hôtel',
        activities: ['Transfert aéroport', 'Check-in hôtel', 'Balade Champs-Élysées'],
        meals: ['Petit-déjeuner'],
        accommodation: 'Hôtel 4* centre-ville'
      },
      {
        day: 2,
        title: 'Paris culturel',
        description: 'Visite des monuments emblématiques',
        activities: ['Tour Eiffel', 'Musée du Louvre', 'Croisière Seine'],
        meals: ['Petit-déjeuner'],
        accommodation: 'Hôtel 4* centre-ville'
      },
      {
        day: 3,
        title: 'Montmartre et départ',
        description: 'Découverte de Montmartre et transfert',
        activities: ['Montmartre', 'Sacré-Cœur', 'Transfert aéroport'],
        meals: ['Petit-déjeuner'],
        accommodation: 'Départ'
      }
    ],
    rating: 4.8,
    reviews: 456,
    difficulty: 'easy',
    bestTime: 'Avril à Octobre',
    groupSize: { min: 2, max: 20 },
    cancellationPolicy: 'Annulation gratuite jusqu\'à 7 jours avant'
  },
  {
    id: '2',
    title: 'New York Express - La Grosse Pomme',
    destination: 'New York, USA',
    destinations: ['New York'],
    duration: '5 jours / 4 nuits',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    includes: ['Hôtel 4* Manhattan', 'Vols A/R', 'Transferts', 'City Pass', 'Tour guidé'],
    excludes: ['Repas', 'Assurance voyage', 'Spectacles Broadway', 'Shopping'],
    highlights: ['Times Square', 'Central Park', 'Statue de la Liberté', 'Broadway', 'Empire State Building'],
    itinerary: [
      {
        day: 1,
        title: 'Arrivée à New York',
        description: 'Accueil et première découverte de Manhattan',
        activities: ['Arrivée JFK', 'Check-in hôtel', 'Times Square'],
        meals: [],
        accommodation: 'Hôtel 4* Manhattan'
      },
      {
        day: 2,
        title: 'Manhattan Sud',
        description: 'Découverte du sud de Manhattan',
        activities: ['Statue de la Liberté', 'Wall Street', 'Brooklyn Bridge'],
        meals: [],
        accommodation: 'Hôtel 4* Manhattan'
      },
      {
        day: 3,
        title: 'Central Park et musées',
        description: 'Culture et détente au cœur de Manhattan',
        activities: ['Central Park', 'Metropolitan Museum', '5th Avenue'],
        meals: [],
        accommodation: 'Hôtel 4* Manhattan'
      },
      {
        day: 4,
        title: 'Empire State et Broadway',
        description: 'Gratte-ciels et spectacles',
        activities: ['Empire State Building', 'High Line', 'Spectacle Broadway'],
        meals: [],
        accommodation: 'Hôtel 4* Manhattan'
      },
      {
        day: 5,
        title: 'Départ',
        description: 'Derniers achats et départ',
        activities: ['Shopping', 'Transfert aéroport'],
        meals: [],
        accommodation: 'Départ'
      }
    ],
    rating: 4.9,
    reviews: 723,
    difficulty: 'moderate',
    bestTime: 'Avril à Juin, Septembre à Novembre',
    groupSize: { min: 1, max: 15 },
    cancellationPolicy: 'Frais d\'annulation selon conditions'
  }
];

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'La Ville Lumière vous attend avec ses monuments iconiques, sa gastronomie raffinée et son art de vivre unique.',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    bestTime: 'Avril à Octobre',
    averageTemperature: { high: 20, low: 8 },
    currency: 'EUR',
    language: 'Français',
    timezone: 'CET',
    attractions: ['Tour Eiffel', 'Louvre', 'Notre-Dame', 'Arc de Triomphe', 'Montmartre'],
    activities: ['Croisières Seine', 'Visites guidées', 'Gastronomie', 'Shopping', 'Musées'],
    averageCost: { budget: 80, midRange: 150, luxury: 300 },
    visaRequired: false,
    safetyRating: 8.5,
    popularWith: ['Couples', 'Familles', 'Culture', 'Gastronomie']
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japon',
    continent: 'Asie',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Découvrez le parfait mélange entre tradition ancestrale et modernité futuriste dans la capitale japonaise.',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    bestTime: 'Mars à Mai, Septembre à Novembre',
    averageTemperature: { high: 22, low: 12 },
    currency: 'JPY',
    language: 'Japonais',
    timezone: 'JST',
    attractions: ['Tokyo Skytree', 'Senso-ji', 'Shibuya Crossing', 'Palais Impérial', 'Harajuku'],
    activities: ['Temples', 'Cuisine japonaise', 'Shopping', 'Karaoke', 'Onsen'],
    averageCost: { budget: 70, midRange: 120, luxury: 250 },
    visaRequired: false,
    safetyRating: 9.2,
    popularWith: ['Culture', 'Gastronomie', 'Technologie', 'Aventure']
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Marie L.',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    date: '2024-03-01',
    comment: 'Séjour parfait ! Hôtel magnifique avec un service exceptionnel. La vue depuis la chambre était à couper le souffle. Le personnel était aux petits soins.',
    helpful: 12,
    verified: true,
    photos: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    pros: ['Service exceptionnel', 'Vue magnifique', 'Propreté irréprochable'],
    cons: ['Prix du minibar élevé'],
    travelType: 'Couple',
    roomType: 'Suite Deluxe',
    stayDuration: '3 nuits'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Pierre M.',
    rating: 4,
    date: '2024-02-28',
    comment: 'Très bon rapport qualité-prix. Bien situé, personnel accueillant. Petit-déjeuner copieux et varié. Juste un peu bruyant côté rue le soir.',
    helpful: 8,
    verified: true,
    pros: ['Emplacement central', 'Petit-déjeuner excellent', 'Personnel sympathique'],
    cons: ['Bruit de la rue', 'WiFi parfois lent'],
    travelType: 'Affaires',
    roomType: 'Chambre Standard',
    stayDuration: '2 nuits'
  }
];

export const mockTravelTips: TravelTip[] = [
  {
    id: '1',
    destination: 'Paris',
    category: 'transport',
    title: 'Navigo Easy vs Navigo Semaine',
    content: 'Pour un séjour de plus de 4 jours, optez pour le pass Navigo Semaine (30€) plutôt que les tickets individuels. Économie garantie !',
    author: 'Expert Easy-Trip',
    rating: 4.8,
    helpful: 156
  },
  {
    id: '2',
    destination: 'Paris',
    category: 'food',
    title: 'Restaurants authentiques',
    content: 'Évitez les restaurants touristiques près des monuments. Les meilleurs bistrots se trouvent dans les 10e, 11e et 20e arrondissements.',
    author: 'Local Guide',
    rating: 4.6,
    helpful: 89
  }
];

export const popularDestinations = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'La Ville Lumière vous attend avec ses monuments iconiques et sa gastronomie raffinée.',
    priceFrom: 299,
    trending: '+15%'
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japon',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Découvrez le parfait mélange entre tradition ancestrale et modernité futuriste.',
    priceFrom: 580,
    trending: '+32%'
  },
  {
    id: '3',
    name: 'New York',
    country: 'États-Unis',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'La ville qui ne dort jamais vous offre une expérience urbaine incomparable.',
    priceFrom: 420,
    trending: '+8%'
  },
  {
    id: '4',
    name: 'Londres',
    country: 'Royaume-Uni',
    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Histoire, culture et modernité se rencontrent dans cette capitale européenne.',
    priceFrom: 250,
    trending: '+12%'
  },
  {
    id: '5',
    name: 'Bali',
    country: 'Indonésie',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Paradis tropical avec temples mystiques, plages de rêve et culture unique.',
    priceFrom: 450,
    trending: '+25%'
  },
  {
    id: '6',
    name: 'Dubaï',
    country: 'Émirats Arabes Unis',
    image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxe, modernité et traditions dans cette métropole du désert.',
    priceFrom: 380,
    trending: '+18%'
  }
];

export const inspirationGallery = [
  {
    id: '1',
    title: 'Plages paradisiaques',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Détente',
    destinations: ['Maldives', 'Bali', 'Seychelles'],
    priceFrom: 890
  },
  {
    id: '2',
    title: 'Aventures en montagne',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Aventure',
    destinations: ['Alpes', 'Himalaya', 'Andes'],
    priceFrom: 650
  },
  {
    id: '3',
    title: 'Escapades urbaines',
    image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Ville',
    destinations: ['New York', 'Tokyo', 'Londres'],
    priceFrom: 420
  },
  {
    id: '4',
    title: 'Découvertes culturelles',
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Culture',
    destinations: ['Rome', 'Athènes', 'Le Caire'],
    priceFrom: 380
  }
];

export const mockPromotions = [
  {
    id: '1',
    title: 'Offre Spéciale Été 2024',
    description: 'Jusqu\'à -40% sur les séjours en Europe + Vol gratuit',
    discount: '40%',
    validUntil: '2024-06-30',
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
    destinations: ['Paris', 'Rome', 'Barcelone', 'Amsterdam'],
    minSpend: 500,
    code: 'SUMMER40'
  },
  {
    id: '2',
    title: 'Week-end Dernière Minute',
    description: 'Réservez maintenant, partez ce week-end - Hôtels 4* inclus',
    discount: '25%',
    validUntil: '2024-03-20',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    destinations: ['Londres', 'Berlin', 'Prague'],
    minSpend: 200,
    code: 'WEEKEND25'
  },
  {
    id: '3',
    title: 'Asie Mystique',
    description: 'Circuit découverte 15 jours - Guide francophone inclus',
    discount: '30%',
    validUntil: '2024-05-15',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    destinations: ['Tokyo', 'Kyoto', 'Bangkok', 'Singapour'],
    minSpend: 1500,
    code: 'ASIA30'
  }
];