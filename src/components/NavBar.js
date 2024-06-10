import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleReservationHistory = () => {
    navigate("/reservations");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <button onClick={handleHome}>Home</button>
      <button onClick={handleReservationHistory}>Reservation History</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default NavBar;
