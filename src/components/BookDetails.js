import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const addDays = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

const todayDate = new Date().toISOString().split('T')[0];
const todayDatePlusThree = addDays(3).toISOString().split('T')[0]

function BookDetails() {
  const [book, setBook] = useState(null);
  const [reservedFrom, setReservedFrom] = useState(todayDate);
  const [reservedTo, setReservedTo] = useState(todayDatePlusThree);
  const [responseMessage, setResponseMessage] = useState("");
  const token = localStorage.getItem("token");

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setBook(response.data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id, token]);

  const handleReservation = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/reservations`,
        {
          bookId: book._id,
          reservedFrom,
          reservedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reservation successful:", response.data);
      setResponseMessage("Reservation successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error making reservation:", error);
      setResponseMessage("Error occured while making reservation. Refresh to try again");
    }
  };

  if (!book) return <div>Loading...</div>;

  if(responseMessage) return <div><p>{responseMessage}</p></div>

  return (
      <div>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.description}</p>
        <p>{book.available ? "Available" : "Not Available"}</p>
        <div>
          <label>Start Date: </label>
          <input
            type="date"
            value={reservedFrom}
            onChange={(e) => setReservedFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date: </label>
          <input
            type="date"
            value={reservedTo}
            onChange={(e) => setReservedTo(e.target.value)}
            required
          />
        </div>
        {book.available && <button onClick={handleReservation}>Reserve</button>}
      </div>
    );
}

export default BookDetails;
