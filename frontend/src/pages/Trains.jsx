import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrains } from "../services/api";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrains()
      .then((res) => setTrains(res.data))
      .catch(() => setError("Unable to load trains"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-card">
      <h1 className="section-title">Train List</h1>
      {error && <div className="alert">{error}</div>}
      {loading ? (
        <p>Loading trains...</p>
      ) : (
        <div className="grid-list">
          {trains.map((train) => {
            return (
              <article key={train._id} className="card">
                <h2 className="card-title">{train.name} ({train.number})</h2>
                <p>From {train.source} to {train.destination}</p>
                <p>Departure: {train.departure_time}</p>
                <p>Current Location: {train.current_location}</p>
                <button onClick={() => navigate(`/seats/${train._id}`)}>
                  Select Seats
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Trains;
