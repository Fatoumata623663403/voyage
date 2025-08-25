export interface Country {
  code: string;
  name: string;
  flag: string;
  popularCities: City[];
}

export interface City {
  name: string;
  country: string;
  airportCode?: string;
  isPopular: boolean;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const popularCountries: Country[] = [
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    popularCities: [
      { name: "Paris", country: "France", airportCode: "CDG", isPopular: true },
      { name: "Nice", country: "France", airportCode: "NCE", isPopular: true },
      { name: "Lyon", country: "France", airportCode: "LYS", isPopular: true },
      {
        name: "Marseille",
        country: "France",
        airportCode: "MRS",
        isPopular: true,
      },
      {
        name: "Toulouse",
        country: "France",
        airportCode: "TLS",
        isPopular: false,
      },
    ],
  },
  {
    code: "ES",
    name: "Espagne",
    flag: "🇪🇸",
    popularCities: [
      {
        name: "Madrid",
        country: "Espagne",
        airportCode: "MAD",
        isPopular: true,
      },
      {
        name: "Barcelone",
        country: "Espagne",
        airportCode: "BCN",
        isPopular: true,
      },
      {
        name: "Séville",
        country: "Espagne",
        airportCode: "SVQ",
        isPopular: true,
      },
      {
        name: "Valence",
        country: "Espagne",
        airportCode: "VLC",
        isPopular: true,
      },
      {
        name: "Bilbao",
        country: "Espagne",
        airportCode: "BIO",
        isPopular: false,
      },
    ],
  },
  {
    code: "IT",
    name: "Italie",
    flag: "🇮🇹",
    popularCities: [
      { name: "Rome", country: "Italie", airportCode: "FCO", isPopular: true },
      { name: "Milan", country: "Italie", airportCode: "MXP", isPopular: true },
      {
        name: "Venise",
        country: "Italie",
        airportCode: "VCE",
        isPopular: true,
      },
      {
        name: "Florence",
        country: "Italie",
        airportCode: "FLR",
        isPopular: true,
      },
      {
        name: "Naples",
        country: "Italie",
        airportCode: "NAP",
        isPopular: false,
      },
    ],
  },
  {
    code: "GB",
    name: "Royaume-Uni",
    flag: "🇬🇧",
    popularCities: [
      {
        name: "Londres",
        country: "Royaume-Uni",
        airportCode: "LHR",
        isPopular: true,
      },
      {
        name: "Édimbourg",
        country: "Royaume-Uni",
        airportCode: "EDI",
        isPopular: true,
      },
      {
        name: "Manchester",
        country: "Royaume-Uni",
        airportCode: "MAN",
        isPopular: true,
      },
      {
        name: "Birmingham",
        country: "Royaume-Uni",
        airportCode: "BHX",
        isPopular: false,
      },
    ],
  },
  {
    code: "DE",
    name: "Allemagne",
    flag: "🇩🇪",
    popularCities: [
      {
        name: "Berlin",
        country: "Allemagne",
        airportCode: "BER",
        isPopular: true,
      },
      {
        name: "Munich",
        country: "Allemagne",
        airportCode: "MUC",
        isPopular: true,
      },
      {
        name: "Francfort",
        country: "Allemagne",
        airportCode: "FRA",
        isPopular: true,
      },
      {
        name: "Hambourg",
        country: "Allemagne",
        airportCode: "HAM",
        isPopular: false,
      },
    ],
  },
  {
    code: "US",
    name: "États-Unis",
    flag: "🇺🇸",
    popularCities: [
      {
        name: "New York",
        country: "États-Unis",
        airportCode: "JFK",
        isPopular: true,
      },
      {
        name: "Los Angeles",
        country: "États-Unis",
        airportCode: "LAX",
        isPopular: true,
      },
      {
        name: "San Francisco",
        country: "États-Unis",
        airportCode: "SFO",
        isPopular: true,
      },
      {
        name: "Miami",
        country: "États-Unis",
        airportCode: "MIA",
        isPopular: true,
      },
      {
        name: "Las Vegas",
        country: "États-Unis",
        airportCode: "LAS",
        isPopular: true,
      },
      {
        name: "Chicago",
        country: "États-Unis",
        airportCode: "ORD",
        isPopular: false,
      },
    ],
  },
  {
    code: "JP",
    name: "Japon",
    flag: "🇯🇵",
    popularCities: [
      { name: "Tokyo", country: "Japon", airportCode: "NRT", isPopular: true },
      { name: "Osaka", country: "Japon", airportCode: "KIX", isPopular: true },
      { name: "Kyoto", country: "Japon", airportCode: "KIX", isPopular: true },
      {
        name: "Hiroshima",
        country: "Japon",
        airportCode: "HIJ",
        isPopular: false,
      },
    ],
  },
  {
    code: "CN",
    name: "Chine",
    flag: "🇨🇳",
    popularCities: [
      { name: "Pékin", country: "Chine", airportCode: "PEK", isPopular: true },
      {
        name: "Shanghai",
        country: "Chine",
        airportCode: "PVG",
        isPopular: true,
      },
      {
        name: "Hong Kong",
        country: "Chine",
        airportCode: "HKG",
        isPopular: true,
      },
      {
        name: "Guangzhou",
        country: "Chine",
        airportCode: "CAN",
        isPopular: false,
      },
    ],
  },
  {
    code: "TH",
    name: "Thaïlande",
    flag: "🇹🇭",
    popularCities: [
      {
        name: "Bangkok",
        country: "Thaïlande",
        airportCode: "BKK",
        isPopular: true,
      },
      {
        name: "Phuket",
        country: "Thaïlande",
        airportCode: "HKT",
        isPopular: true,
      },
      {
        name: "Chiang Mai",
        country: "Thaïlande",
        airportCode: "CNX",
        isPopular: true,
      },
    ],
  },
  {
    code: "ID",
    name: "Indonésie",
    flag: "🇮🇩",
    popularCities: [
      {
        name: "Jakarta",
        country: "Indonésie",
        airportCode: "CGK",
        isPopular: true,
      },
      {
        name: "Bali",
        country: "Indonésie",
        airportCode: "DPS",
        isPopular: true,
      },
      {
        name: "Yogyakarta",
        country: "Indonésie",
        airportCode: "JOG",
        isPopular: false,
      },
    ],
  },
  {
    code: "AU",
    name: "Australie",
    flag: "🇦🇺",
    popularCities: [
      {
        name: "Sydney",
        country: "Australie",
        airportCode: "SYD",
        isPopular: true,
      },
      {
        name: "Melbourne",
        country: "Australie",
        airportCode: "MEL",
        isPopular: true,
      },
      {
        name: "Brisbane",
        country: "Australie",
        airportCode: "BNE",
        isPopular: true,
      },
      {
        name: "Perth",
        country: "Australie",
        airportCode: "PER",
        isPopular: false,
      },
    ],
  },
  {
    code: "BR",
    name: "Brésil",
    flag: "🇧🇷",
    popularCities: [
      {
        name: "Rio de Janeiro",
        country: "Brésil",
        airportCode: "GIG",
        isPopular: true,
      },
      {
        name: "São Paulo",
        country: "Brésil",
        airportCode: "GRU",
        isPopular: true,
      },
      {
        name: "Salvador",
        country: "Brésil",
        airportCode: "SSA",
        isPopular: true,
      },
    ],
  },
  {
    code: "MA",
    name: "Maroc",
    flag: "🇲🇦",
    popularCities: [
      {
        name: "Marrakech",
        country: "Maroc",
        airportCode: "RAK",
        isPopular: true,
      },
      {
        name: "Casablanca",
        country: "Maroc",
        airportCode: "CMN",
        isPopular: true,
      },
      { name: "Fès", country: "Maroc", airportCode: "FEZ", isPopular: true },
      { name: "Rabat", country: "Maroc", airportCode: "RBA", isPopular: false },
    ],
  },
  {
    code: "EG",
    name: "Égypte",
    flag: "🇪��",
    popularCities: [
      {
        name: "Le Caire",
        country: "Égypte",
        airportCode: "CAI",
        isPopular: true,
      },
      {
        name: "Louxor",
        country: "Égypte",
        airportCode: "LXR",
        isPopular: true,
      },
      {
        name: "Hurghada",
        country: "Égypte",
        airportCode: "HRG",
        isPopular: true,
      },
    ],
  },
  {
    code: "TR",
    name: "Turquie",
    flag: "🇹🇷",
    popularCities: [
      {
        name: "Istanbul",
        country: "Turquie",
        airportCode: "IST",
        isPopular: true,
      },
      {
        name: "Antalya",
        country: "Turquie",
        airportCode: "AYT",
        isPopular: true,
      },
      {
        name: "Cappadoce",
        country: "Turquie",
        airportCode: "NAV",
        isPopular: true,
      },
    ],
  },
  {
    code: "GR",
    name: "Grèce",
    flag: "🇬🇷",
    popularCities: [
      {
        name: "Athènes",
        country: "Grèce",
        airportCode: "ATH",
        isPopular: true,
      },
      {
        name: "Santorin",
        country: "Grèce",
        airportCode: "JTR",
        isPopular: true,
      },
      {
        name: "Mykonos",
        country: "Grèce",
        airportCode: "JMK",
        isPopular: true,
      },
      { name: "Rhodes", country: "Grèce", airportCode: "RHO", isPopular: true },
    ],
  },
  {
    code: "ZA",
    name: "Afrique du Sud",
    flag: "🇿🇦",
    popularCities: [
      {
        name: "Le Cap",
        country: "Afrique du Sud",
        airportCode: "CPT",
        isPopular: true,
      },
      {
        name: "Johannesburg",
        country: "Afrique du Sud",
        airportCode: "JNB",
        isPopular: true,
      },
      {
        name: "Durban",
        country: "Afrique du Sud",
        airportCode: "DUR",
        isPopular: true,
      },
      {
        name: "Port Elizabeth",
        country: "Afrique du Sud",
        airportCode: "PLZ",
        isPopular: false,
      },
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    popularCities: [
      {
        name: "Nairobi",
        country: "Kenya",
        airportCode: "NBO",
        isPopular: true,
      },
      {
        name: "Mombasa",
        country: "Kenya",
        airportCode: "MBA",
        isPopular: true,
      },
      {
        name: "Malindi",
        country: "Kenya",
        airportCode: "MYD",
        isPopular: true,
      },
    ],
  },
  {
    code: "TZ",
    name: "Tanzanie",
    flag: "🇹🇿",
    popularCities: [
      {
        name: "Dar es Salaam",
        country: "Tanzanie",
        airportCode: "DAR",
        isPopular: true,
      },
      {
        name: "Zanzibar",
        country: "Tanzanie",
        airportCode: "ZNZ",
        isPopular: true,
      },
      {
        name: "Arusha",
        country: "Tanzanie",
        airportCode: "ARK",
        isPopular: true,
      },
    ],
  },
  {
    code: "SN",
    name: "Sénégal",
    flag: "🇸🇳",
    popularCities: [
      {
        name: "Dakar",
        country: "Sénégal",
        airportCode: "DKR",
        isPopular: true,
      },
      {
        name: "Saint-Louis",
        country: "Sénégal",
        airportCode: "XLS",
        isPopular: true,
      },
      {
        name: "Saly",
        country: "Sénégal",
        isPopular: true,
      },
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    popularCities: [
      {
        name: "Accra",
        country: "Ghana",
        airportCode: "ACC",
        isPopular: true,
      },
      {
        name: "Kumasi",
        country: "Ghana",
        airportCode: "KMS",
        isPopular: true,
      },
      {
        name: "Cape Coast",
        country: "Ghana",
        isPopular: true,
      },
    ],
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    popularCities: [
      {
        name: "Lagos",
        country: "Nigeria",
        airportCode: "LOS",
        isPopular: true,
      },
      {
        name: "Abuja",
        country: "Nigeria",
        airportCode: "ABV",
        isPopular: true,
      },
      {
        name: "Kano",
        country: "Nigeria",
        airportCode: "KAN",
        isPopular: false,
      },
    ],
  },
  {
    code: "TN",
    name: "Tunisie",
    flag: "🇹🇳",
    popularCities: [
      {
        name: "Tunis",
        country: "Tunisie",
        airportCode: "TUN",
        isPopular: true,
      },
      {
        name: "Monastir",
        country: "Tunisie",
        airportCode: "MIR",
        isPopular: true,
      },
      {
        name: "Djerba",
        country: "Tunisie",
        airportCode: "DJE",
        isPopular: true,
      },
      {
        name: "Sousse",
        country: "Tunisie",
        isPopular: true,
      },
    ],
  },
  {
    code: "ET",
    name: "Éthiopie",
    flag: "🇪🇹",
    popularCities: [
      {
        name: "Addis-Abeba",
        country: "Éthiopie",
        airportCode: "ADD",
        isPopular: true,
      },
      {
        name: "Lalibela",
        country: "Éthiopie",
        airportCode: "LLI",
        isPopular: true,
      },
      {
        name: "Gondar",
        country: "Éthiopie",
        isPopular: true,
      },
    ],
  },
  {
    code: "RW",
    name: "Rwanda",
    flag: "🇷🇼",
    popularCities: [
      {
        name: "Kigali",
        country: "Rwanda",
        airportCode: "KGL",
        isPopular: true,
      },
      {
        name: "Gisenyi",
        country: "Rwanda",
        isPopular: true,
      },
    ],
  },
  {
    code: "MU",
    name: "Maurice",
    flag: "🇲🇺",
    popularCities: [
      {
        name: "Port-Louis",
        country: "Maurice",
        airportCode: "MRU",
        isPopular: true,
      },
      {
        name: "Grand Baie",
        country: "Maurice",
        isPopular: true,
      },
      {
        name: "Flic en Flac",
        country: "Maurice",
        isPopular: true,
      },
    ],
  },
];

export const getAllCities = (): City[] => {
  return popularCountries.flatMap((country) => country.popularCities);
};

export const getPopularCities = (): City[] => {
  return getAllCities().filter((city) => city.isPopular);
};

export const searchCities = (query: string): City[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllCities().filter(
    (city) =>
      city.name.toLowerCase().includes(lowercaseQuery) ||
      city.country.toLowerCase().includes(lowercaseQuery) ||
      city.airportCode?.toLowerCase().includes(lowercaseQuery),
  );
};

export const getCitiesByCountry = (countryName: string): City[] => {
  const country = popularCountries.find((c) => c.name === countryName);
  return country ? country.popularCities : [];
};

// Exemples de destinations populaires par catégorie
export const destinationCategories = {
  europe: [
    "Paris, France",
    "Rome, Italie",
    "Barcelone, Espagne",
    "Londres, Royaume-Uni",
    "Amsterdam, Pays-Bas",
    "Berlin, Allemagne",
    "Athènes, Grèce",
    "Prague, République tchèque",
    "Vienne, Autriche",
    "Budapest, Hongrie",
    "Istanbul, Turquie",
    "Lisbonne, Portugal",
    "Copenhague, Danemark",
    "Stockholm, Suède",
    "Oslo, Norvège",
    "Helsinki, Finlande",
    "Zurich, Suisse",
    "Bruxelles, Belgique",
    "Dublin, Irlande",
    "Zagreb, Croatie",
  ],
  asie: [
    "Tokyo, Japon",
    "Bangkok, Thaïlande",
    "Bali, Indonésie",
    "Singapour",
    "Seoul, Corée du Sud",
    "Hong Kong, Chine",
    "Kuala Lumpur, Malaisie",
    "Mumbai, Inde",
    "Delhi, Inde",
    "Dubai, Émirats arabes unis",
    "Pékin, Chine",
    "Shanghai, Chine",
    "Manila, Philippines",
    "Hanoi, Vietnam",
    "Phnom Penh, Cambodge",
    "Yangon, Myanmar",
    "Colombo, Sri Lanka",
    "Katmandou, Népal",
    "Taipei, Taiwan",
    "Osaka, Japon",
  ],
  ameriques: [
    "New York, États-Unis",
    "Los Angeles, États-Unis",
    "Rio de Janeiro, Brésil",
    "Buenos Aires, Argentine",
    "Toronto, Canada",
    "Mexico, Mexique",
    "Lima, Pérou",
    "Santiago, Chili",
    "Miami, États-Unis",
    "Las Vegas, États-Unis",
    "Chicago, États-Unis",
    "San Francisco, États-Unis",
    "Montréal, Canada",
    "Vancouver, Canada",
    "São Paulo, Brésil",
    "Bogotá, Colombie",
    "Quito, Équateur",
    "La Paz, Bolivie",
    "Montevideo, Uruguay",
    "Caracas, Venezuela",
  ],
  afrique: [
    "Marrakech, Maroc",
    "Le Caire, Égypte",
    "Le Cap, Afrique du Sud",
    "Nairobi, Kenya",
    "Tunis, Tunisie",
    "Lagos, Nigeria",
    "Casablanca, Maroc",
    "Johannesburg, Afrique du Sud",
    "Zanzibar, Tanzanie",
    "Dakar, Sénégal",
    "Accra, Ghana",
    "Addis-Abeba, Éthiopie",
    "Kigali, Rwanda",
    "Port-Louis, Maurice",
    "Mombasa, Kenya",
    "Djerba, Tunisie",
    "Fès, Maroc",
    "Louxor, Égypte",
    "Durban, Afrique du Sud",
    "Dar es Salaam, Tanzanie",
    "Alger, Algérie",
    "Abidjan, Côte d'Ivoire",
    "Bamako, Mali",
    "Ouagadougou, Burkina Faso",
    "Conakry, Guinée",
    "Freetown, Sierra Leone",
    "Monrovia, Libéria",
    "Bissau, Guinée-Bissau",
    "Praia, Cap-Vert",
    "Banjul, Gambie",
  ],
  oceanie: [
    "Sydney, Australie",
    "Auckland, Nouvelle-Zélande",
    "Melbourne, Australie",
    "Brisbane, Australie",
    "Wellington, Nouvelle-Zélande",
    "Perth, Australie",
    "Adelaide, Australie",
    "Canberra, Australie",
    "Gold Coast, Australie",
    "Christchurch, Nouvelle-Zélande",
  ],
};

// Suggestions d'autocomplétion
export const getLocationSuggestions = (
  input: string,
  limit: number = 5,
): string[] => {
  const allDestinations = [
    ...destinationCategories.europe,
    ...destinationCategories.asie,
    ...destinationCategories.ameriques,
    ...destinationCategories.afrique,
    ...destinationCategories.oceanie,
  ];

  if (!input) {
    return allDestinations.slice(0, limit);
  }

  const filtered = allDestinations.filter((destination) =>
    destination.toLowerCase().includes(input.toLowerCase()),
  );

  return filtered.slice(0, limit);
};
