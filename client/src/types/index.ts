export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: {
    airport: string;
    airportCode: string;
    city: string;
    country: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    airportCode: string;
    city: string;
    country: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  duration: string;
  price: number;
  originalPrice?: number;
  stops: number;
  stopDetails?: {
    airport: string;
    city: string;
    duration: string;
  }[];
  aircraft: string;
  class: 'economy' | 'premium' | 'business' | 'first';
  baggage: {
    cabin: string;
    checked: string;
  };
  amenities: string[];
  cancellationPolicy: string;
  changePolicy: string;
  mealService: boolean;
  wifiAvailable: boolean;
  seatSelection: boolean;
  carbonEmission: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  starRating: number;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  reviews: number;
  reviewScore: number;
  roomType: string;
  roomSize: number;
  bedType: string;
  maxGuests: number;
  cancellation: string;
  breakfast: boolean;
  freeCancellation: boolean;
  payAtProperty: boolean;
  instantBooking: boolean;
  distanceFromCenter: number;
  nearbyAttractions: string[];
  checkInTime: string;
  checkOutTime: string;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    children: string;
    pets: string;
  };
}

export interface CarRental {
  id: string;
  company: string;
  brand: string;
  model: string;
   pricePerDay: number;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  transmission: 'manual' | 'automatic';
  fuel: string;
  seats: number;
  doors: number;
  airConditioning: boolean;
  location: string;
  pickupLocations: string[];
  mileage: 'limited' | 'unlimited';
  insurance: string[];
  minimumAge: number;
  deposit: number;
  cancellationPolicy: string;
  luggage: number;
  
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  included: string[];
  excluded: string[];
  reviews: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  groupSize: {
    min: number;
    max: number;
  };
  languages: string[];
  ageRestriction: string;
  cancellationPolicy: string;
  meetingPoint: string;
  whatToBring: string[];
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  destinations: string[];
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  includes: string[];
  excludes: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation: string;
  }[];
  rating: number;
  reviews: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestTime: string;
  groupSize: {
    min: number;
    max: number;
  };
  cancellationPolicy: string;
}

export interface SearchFilters {
  priceRange: [number, number];
  stops: string;
  airlines: string[];
  rating: number;
  amenities: string[];
  starRating: number;
  mealService: boolean;
  wifiAvailable: boolean;
  freeCancellation: boolean;
  instantBooking: boolean;
  payAtProperty: boolean;
}

export interface Booking {


   _id: string; // Ajouté pour corriger l'erreur
  userId: string;
  type: 'flight' | 'hotel' | 'car' | 'activity' | 'package';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
  travelDate: string;
  details: Flight | Hotel | CarRental | Activity | Package;
  passengers:string[]| Passenger[];
  guests?: number;
  totalPrice: number;
  currency: string;
  paymentMethod: string;
  confirmationNumber: string;
  specialRequests?: string;
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  specialRequests?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  preferences: {
    currency: string;
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    travelPreferences: {
      seatPreference: string;
      mealPreference: string;
      roomPreference: string;
    };
  };
  bookings: Booking[];
  favorites: string[];
  loyaltyPoints: number;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  cardType?: string;
  expiryDate?: string;
  holderName?: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  photos?: string[];
  pros?: string[];
  cons?: string[];
  travelType: string;
  roomType?: string;
  stayDuration?: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'reminder' | 'update' | 'price_alert';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  images: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bestTime: string;
  averageTemperature: {
    high: number;
    low: number;
  };
  currency: string;
  language: string;
  timezone: string;
  attractions: string[];
  activities: string[];
  averageCost: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  visaRequired: boolean;
  safetyRating: number;
  popularWith: string[];
}

export interface PriceAlert {
  id: string;
  userId: string;
  type: 'flight' | 'hotel';
  route?: {
    from: string;
    to: string;
  };
  destination?: string;
  dates: {
    departure: string;
    return?: string;
  };
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
}

export interface TravelDocument {
  id: string;
  userId: string;
  type: 'passport' | 'visa' | 'id_card' | 'driving_license';
  number: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  image?: string;
}

export interface Insurance {
  id: string;
  name: string;
  provider: string;
  coverage: string[];
  price: number;
  duration: string;
  regions: string[];
  maxAge: number;
  preExistingConditions: boolean;
}

export interface WeatherInfo {
  destination: string;
  date: string;
  temperature: {
    high: number;
    low: number;
  };
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export interface TravelTip {
  id: string;
  destination: string;
  category: 'transport' | 'accommodation' | 'food' | 'culture' | 'safety' | 'budget';
  title: string;
  content: string;
  author: string;
  rating: number;
  helpful: number;
}


export interface MapViewProps {
  hotels?: Hotel[];
  center?: { lat: number; lng: number };
  zoom?: number;
}