import React from 'react';
import DashboardStats from './DashboardStats';
import UserManagement from './UserManagement';
import BookingManagement from './BookingManagement';
import PackageManagement from './PackageManagement';
import PaymentsSupport from './PaymentsSupport';
import { Flight, Hotel, CarRental, Activity, Package, Booking, User } from '../../types';
import { ChevronRight } from 'lucide-react';
import Card from '../../utils/Card';
import Badge from "../../utils/Badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";


// Données exemples
const recentBookings = [
  { user: "John Doe", trip: "Paris - Dakar", date: "2025-08-01" },
  { user: "Jane Smith", trip: "Conakry - Bamako", date: "2025-08-10" },
];

const tickets = [
  { user: "Ali", subject: "Payment issue", status: "Open" },
  { user: "Mariam", subject: "Booking not confirmed", status: "Pending" },
  { user: "Ousmane", subject: "Refund request", status: "Resolved" },
];

const tripsData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 27 },
  { name: "May", value: 35 },
];

const paymentsData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 800 },
  { month: "Apr", value: 1700 },
  { month: "May", value: 900 },
];

const statusData = [
  { name: "Completed", value: 400, color: "green" },
  { name: "Pending", value: 300, color: "yellow" },
  { name: "Cancelled", value: 100, color: "red" },
];


interface AdminDashboardProps {
  section: string;
  users: User[];
  bookings: Booking[];
  packages: Package[];
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: User) => void;
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => void;
  onDeletePackage: (id: string) => void;
}


 
const AdminDashboard: React.FC<AdminDashboardProps> = ({
  section, users, bookings, packages,
  onDeleteUser, onUpdateUser, onUpdateBookingStatus, onDeletePackage
}) => {
  switch (section) {
    case 'dashboard':
      return (
        <div className="space-y-6 min-h-screen bg-slate-900 text-slate-900">
          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card title="Trips Overview">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tripsData} barSize={18}>
                    <XAxis dataKey="name" tick={{ fill: "#d4d2d2ff" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #151617ff", borderRadius: 12, color: "#f3f7f9ff" }} />
                    <Bar dataKey="value" radius={[6,6,0,0]} fill="#2372f2ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Payments">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={paymentsData}>
                    <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, color: "#e2e8f0" }} />
                    <Line type="monotone" dataKey="value" stroke="#22D3EE" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <Card title="Bookings by Status" right={<LegendWrapper />}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                      {statusData.map((entry, i) => (
                        <Cell key={i} fill={
                          entry.color === "green" ? "#22C55E" :
                          entry.color === "yellow" ? "#EAB308" :
                          "#ee1616ff"
                        } />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#121417ff", border: "1px solid #334155", borderRadius: 12, color: "#e2e8f0" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Statistiques */}
          <DashboardStats users={users} bookings={bookings} packages={packages} />

          {/* Recent bookings */}
          <Card
            title="Recent Bookings"
            right={
              <button className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-00">
                    <th className="text-left font-medium pb-2">User</th>
                    <th className="text-left font-medium pb-2">Trip</th>
                    <th className="text-left font-medium pb-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {recentBookings.map((row, i) => (
                    <tr key={i} className="text-slate-00">
                      <td className="py-2">{row.user}</td>
                      <td className="py-2">{row.trip}</td>
                      <td className="py-2">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Support Tickets */}
          <Card title="Support Tickets">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-00">
                    <th className="text-left font-medium pb-2">User</th>
                    <th className="text-left font-medium pb-2">Subject</th>
                    <th className="text-left font-medium pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {tickets.map((t, i) => (
                    <tr key={i} className="text-slate-00">
                      <td className="py-2">{t.user}</td>
                      <td className="py-2">{t.subject}</td>
                      <td className="py-2">
                        {t.status === "Open" && <Badge tone="warning">Open</Badge>}
                        {t.status === "Pending" && <Badge tone="yellow">Pending</Badge>}
                        {t.status === "Resolved" && <Badge tone="success">Resolved</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    case 'users':
      return <UserManagement users={users} onDeleteUser={onDeleteUser} onUpdateUser={onUpdateUser} />;
    case 'bookings':
      return <BookingManagement bookings={bookings} onUpdateStatus={onUpdateBookingStatus} />;
    case 'packages':
      return <PackageManagement packages={packages} onDeletePackage={onDeletePackage} />;
    case 'payments':
    case 'support':
      return <PaymentsSupport bookings={bookings} />;
    default:
      return <div>Section non trouvée</div>;
  }
};

function LegendWrapper() {
  return (
    <div className="hidden md:flex items-center gap-3 text-xs text-slate-300">
      <LegendDot color="#377cf3ff" label="Confirmed" />
      <LegendDot color="#30d4edff" label="Pending" />
      <LegendDot color="#8B5CF6" label="Cancelled" />
      <LegendDot color="#eb2525ff" label="Completed" />
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: color }} />
      <span>{label}</span>
    </span>
  );
}

export default AdminDashboard;
