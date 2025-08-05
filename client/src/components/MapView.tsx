import React from 'react';
import { MapPin, Navigation, ZoomIn as Zoom } from 'lucide-react';

const MapView: React.FC = () => {
  const mockHotels = [
    { id: '1', name: 'Hotel Central', lat: 48.8566, lng: 2.3522, price: 150 },
    { id: '2', name: 'Hotel Luxury', lat: 48.8606, lng: 2.3376, price: 280 },
    { id: '3', name: 'Hotel Budget', lat: 48.8534, lng: 2.3488, price: 89 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Carte des hôtels
          </h3>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Navigation className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Zoom className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-96 bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path d="M50 150 Q200 100 350 150" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <path d="M100 50 Q200 200 300 250" stroke="#94a3b8" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {mockHotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${25 + index * 25}%`,
                top: `${30 + index * 15}%`
              }}
            >
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:bg-blue-700 transition-colors">
                {hotel.price}€
              </div>

              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap relative">
                  {hotel.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
            <div className="text-sm font-medium text-gray-900 mb-2">Légende</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span>Hôtels disponibles</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span>Transports</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
            <button className="block p-2 hover:bg-gray-100 border-b border-gray-200">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="block p-2 hover:bg-gray-100">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {mockHotels.map((hotel) => (
            <div key={hotel.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-900">{hotel.name}</span>
              <span className="text-sm text-blue-600 font-medium">{hotel.price}€/nuit</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
