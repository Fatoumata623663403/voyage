import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-3">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/trips">Voyages</Link></li>
        <li><Link to="/admin/reservations">Réservations</Link></li>
        <li><Link to="/admin/payments">Paiements</Link></li>
        <li><Link to="/admin/users">Utilisateurs</Link></li>
        <li><Link to="/admin/support">Support</Link></li>
      </ul>
    </div>
  );
}
