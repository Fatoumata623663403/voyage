import React from 'react';
import { Bell, X, CheckCircle, Gift, Calendar, AlertCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Réservation confirmée',
      message: 'Votre vol Paris-New York du 15 mars est confirmé',
      date: '2024-03-10',
      read: false,
      priority: "high", // ✅ Ajouté ici

    },
    {
      id: '2',
      type: 'promotion',
      title: 'Offre spéciale',
      message: 'Jusqu\'à -40% sur les hôtels en Europe',
      date: '2024-03-09',
      read: false,
      priority: "high", // ✅ Ajouté ici
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Check-in disponible',
      message: 'Votre check-in en ligne est maintenant disponible',
      date: '2024-03-08',
      read: true,
      priority: "high", // ✅ Ajouté ici
    }
    

  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-purple-500" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-700 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notification.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium">
            Marquer tout comme lu
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;