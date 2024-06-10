import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function BookList() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, [token]);

  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>{book.title}</Link> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;