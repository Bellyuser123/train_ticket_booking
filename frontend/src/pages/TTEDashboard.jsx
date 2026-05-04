import { useState, useEffect } from "react";
import { fetchTrains, fetchSeats, updateSeatStatus } from "../services/api";

const TTEDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [seats, setSeats] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTrains().then(res => setTrains(res.data));
  }, []);

  const handleTrainSelect = async (trainId) => {
    setSelectedTrain(trainId);
    try {
      const res = await fetchSeats(trainId);
      setSeats(res.data);
    } catch (error) {
      setMessage("Could not load seats");
    }
  };

  const handleSeatUpdate = async (seatId, status) => {
    try {
      await updateSeatStatus(seatId, { status });
      setMessage("Seat updated");
      // Refresh seats
      if (selectedTrain) {
        const res = await fetchSeats(selectedTrain);
        setSeats(res.data);
      }
    } catch (error) {
      setMessage("Update failed");
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">TTE Dashboard</h1>
      {message && <div className="alert">{message}</div>}
      <div className="section-grid md:grid-cols-1 lg:grid-cols-2">
        <div className="card">
          <h3>Select Train</h3>
          <select onChange={(e) => handleTrainSelect(e.target.value)} className="w-full">
            <option value="">Choose train</option>
            {trains.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
        </div>
        {selectedTrain && (
          <div className="card">
            <h3>Seat Control</h3>
            <div className="grid-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
              {seats.map((seat) => (
                <div key={seat._id} className="card" style={{ padding: "0.5rem" }}>
                  <p className="text-sm">{seat.coach_number}-{seat.seat_number}</p>
                  <span className={`badge ${seat.status}`}>{seat.status}</span>
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                    <button className="text-xs px-2 py-1" onClick={() => handleSeatUpdate(seat._id, "vacant")}>Vacant</button>
                    <button className="text-xs px-2 py-1" onClick={() => handleSeatUpdate(seat._id, "occupied")}>Occupied</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TTEDashboard;