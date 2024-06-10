import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function BookDetails() {
  const [book, setBook] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  const handleReservation = () => {
    // Implement reservation logic
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.available ? 'Available' : 'Not Available'}</p>
      {book.available && <button onClick={handleReservation}>Reserve</button>}
    </div>
  );
}

export default BookDetails;