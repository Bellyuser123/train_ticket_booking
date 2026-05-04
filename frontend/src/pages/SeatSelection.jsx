import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTrains, fetchSeats, bookTicket } from "../services/api";

const SeatSelection = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("rapidUser"));

  useEffect(() => {
    Promise.all([fetchTrains(), fetchSeats(trainId)])
      .then(([trainRes, seatRes]) => {
        const current = trainRes.data.find((item) => item._id === trainId);
        setTrain(current);
        setSeats(seatRes.data);
      })
      .catch(() => setMessage("Could not load train or seats"))
      .finally(() => setLoading(false));
  }, [trainId]);

  const handleBooking = async () => {
    if (!user || !selectedSeat) return;

    try {
      const response = await bookTicket({
        user_id: user._id,
        train_id: trainId,
        coach_number: selectedSeat.coach_number,
        seat_number: selectedSeat.seat_number,
      });
      const ticket = response.data.ticket;
      localStorage.setItem("rapidBooking", JSON.stringify({ train, ticket, user, seat: selectedSeat }));
      navigate("/payment");
    } catch (error) {
      setMessage(error.response?.data?.error || "Booking failed.");
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">Seat Selection</h1>
      {message && <div className="alert">{message}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : !train ? (
        <p>Train not found.</p>
      ) : (
        <>
          <div className="card">
            <h2 className="card-title">{train.name} ({train.number})</h2>
            <p>From {train.source} to {train.destination}</p>
          </div>
          <div className="section-grid">
            <div className="card">
              <h3>Seat map</h3>
              <div className="grid-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}>
                {seats.map((seat) => (
                  <div
                    key={seat._id}
                    className={`card ${seat.status === "vacant" ? "vacant" : "occupied"}`}
                    style={{
                      padding: "0.5rem",
                      cursor: seat.status === "vacant" ? "pointer" : "not-allowed",
                      background: seat.status === "vacant" ? "#d1fae5" : "#fee2e2",
                      border: selectedSeat?._id === seat._id ? "2px solid #2563eb" : "1px solid #e5e7eb"
                    }}
                    onClick={() => seat.status === "vacant" && setSelectedSeat(seat)}
                  >
                    <p>{seat.coach_number}-{seat.seat_number}</p>
                    <span className={`badge ${seat.status}`}>{seat.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Booking</h3>
              {selectedSeat ? (
                <>
                  <p>Selected: {selectedSeat.coach_number}-{selectedSeat.seat_number}</p>
                  <button onClick={handleBooking}>Proceed to Payment</button>
                </>
              ) : (
                <p>Select a vacant seat to book.</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SeatSelection;
