import { Home, User, CreditCard, Box, MessageCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8">Admin</h1>
      <nav className="flex flex-col gap-4">
        <button className="flex items-center gap-2"><Home size={20}/> Dashboard</button>
        <button className="flex items-center gap-2"><Box size={20}/> Trips</button>
        <button className="flex items-center gap-2"><User size={20}/> Users</button>
        <button className="flex items-center gap-2"><CreditCard size={20}/> Payments</button>
        <button className="flex items-center gap-2"><MessageCircle size={20}/> Support</button>
      </nav>
    </aside>
  );
}
