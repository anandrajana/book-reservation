import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import ReservationHistory from './components/ReservationHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/reservations" element={<ReservationHistory />} />
      </Routes>
    </Router>
  );
}

export default App;