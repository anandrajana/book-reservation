import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function ReservationHistory() {
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setReservations(response.data))
      .catch((error) =>
        console.error("Error fetching reservation history:", error)
      );
  }, [token]);

  return (
    <div>
      <h1>Reservation History</h1>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              {reservation.book.title} - From{" "}
              {new Date(reservation.reservedFrom).toLocaleDateString()} to{" "}
              {new Date(reservation.reservedTo).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations done</p>
      )}
    </div>
  );
}

export default ReservationHistory;
