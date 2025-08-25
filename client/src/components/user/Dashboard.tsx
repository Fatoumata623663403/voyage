
import * as axios from "axios";

import React, { useEffect, useState } from "react";

import { Booking } from "../../types"; // <-- Assure-toi que le chemin est correct

interface DashboardProps {
  userId: string;
}

const statusColor = {
  confirmed: "green",
  pending: "orange",
  cancelled: "red",
    completed: "blue",
};

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>(`http://localhost:5000/api/users/${userId}/bookings`);
        setBookings(res.data);
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Erreur récupération réservations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Chargement des réservations...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Bienvenue sur votre Dashboard</h2>
      <h3>Mes réservations</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {bookings.map((b) => (
          <li
            key={b.id}
            onClick={() => setSelectedBooking(b)}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <strong>{b.type.toUpperCase()}</strong> à {b.destination} -{" "}
            <span style={{ color: statusColor[b.status] }}>{b.status}</span> - {b.totalPrice}$
          </li>
        ))}
      </ul>

      {selectedBooking && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #333",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <h4>Détails de la réservation</h4>
          <p>
            <strong>Type:</strong> {selectedBooking.type}
          </p>
          <p>
            <strong>Destination:</strong> {selectedBooking.destination}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedBooking.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Total:</strong> {selectedBooking.totalPrice}$
          </p>
          <p>
            <strong>Statut:</strong>{" "}
            <span style={{ color: statusColor[selectedBooking.status] }}>
              {selectedBooking.status}
            </span>
          </p>
          <p>
            <strong>Détails supplémentaires:</strong>{" "}
            <pre>{JSON.stringify(selectedBooking.details, null, 2)}</pre>
          </p>
          <button onClick={() => setSelectedBooking(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
