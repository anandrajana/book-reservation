import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function ReservationHistory() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/reservations/userId`)  // Replace with actual user ID or auth logic
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservation history:', error));
  }, []);

  return (
    <div>
      <h1>Reservation History</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation._id}>
            {reservation.book.title} - From {new Date(reservation.reservedFrom).toLocaleDateString()} to {new Date(reservation.reservedTo).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationHistory;
