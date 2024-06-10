import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import ReservationHistory from "./components/ReservationHistory";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.clear();
  }

  return (
    <Router>
      <>
        {!token ? (
          <Routes>
            <Route
              path="/login"
              element={<Login setToken={handleSetToken} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            <NavBar onLogout={handleLogout}/>
            <Routes>
              <Route path="/" exact element={<BookList />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/reservations" element={<ReservationHistory />} />
            </Routes>
          </>
        )}
      </>
    </Router>
  );
}

export default App;
