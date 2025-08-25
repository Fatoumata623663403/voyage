import React, { ReactNode, useState } from "react";
import { 
  Home, Users, Plane, Package, DollarSign, MessageSquare, 
  Bell, Search, Menu 
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "users", label: "UtilisateurS", icon: Users },
    { id: "bookings", label: "Réservations", icon: Plane },
    { id: "packages", label: "Séjours", icon: Package },
    { id: "payments", label: "Paiements", icon: DollarSign },
    { id: "support", label: "Support", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <span
            className={`font-bold text-xl transition-opacity ${
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Admin
          </span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
        </div>
        <nav className="mt-6 flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className={`${sidebarOpen ? "inline" : "hidden"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          {/* Search */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Children content */}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
