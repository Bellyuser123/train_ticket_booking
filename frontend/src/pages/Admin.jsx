import { useState, useEffect } from "react";
import { addTrain, addPreBookedSeat, updateTrainLocation, fetchTrains } from "../services/api";

const Admin = () => {
  const [message, setMessage] = useState(null);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains().then(res => setTrains(res.data));
  }, []);

  const handleAddTrain = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("name"),
      number: formData.get("number"),
      source: formData.get("source"),
      destination: formData.get("destination"),
      departure_time: formData.get("departure_time"),
      total_seats: Number(formData.get("total_seats")),
      coach_number: formData.get("coach_number"),
    };
    try {
      await addTrain(payload);
      setMessage("Train added successfully");
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed");
    }
  };

  const handleAddSeat = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      train_id: formData.get("train_id"),
      coach_number: formData.get("coach_number"),
      seat_number: Number(formData.get("seat_number")),
    };
    try {
      await addPreBookedSeat(payload);
      setMessage("Pre-booked seat added");
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed");
    }
  };

  const handleUpdateLocation = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const trainId = formData.get("train_id");
    const payload = { current_location: formData.get("current_location") };
    try {
      await updateTrainLocation(trainId, payload);
      setMessage("Location updated");
      // Refresh trains
      fetchTrains().then(res => setTrains(res.data));
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed");
    }
  };

  const handleAutoUpdateLocation = async (trainId) => {
    const train = trains.find(t => t._id === trainId);
    if (!train) return;
    const nextLocation = train.current_location === train.source ? train.destination : train.source;
    try {
      await updateTrainLocation(trainId, { current_location: nextLocation });
      setMessage(`Location updated to ${nextLocation}`);
      // Refresh trains
      fetchTrains().then(res => setTrains(res.data));
    } catch (error) {
      setMessage("Auto update failed");
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">Admin Panel</h1>
      {message && <div className="alert">{message}</div>}
      <div className="section-grid">
        <div className="card">
          <h3>Add Train</h3>
          <form onSubmit={handleAddTrain} className="form-grid">
            <div className="input-group">
              <label>Name</label>
              <input name="name" required />
            </div>
            <div className="input-group">
              <label>Number</label>
              <input name="number" required />
            </div>
            <div className="input-group">
              <label>Source</label>
              <input name="source" required />
            </div>
            <div className="input-group">
              <label>Destination</label>
              <input name="destination" required />
            </div>
            <div className="input-group">
              <label>Departure Time</label>
              <input name="departure_time" required />
            </div>
            <div className="input-group">
              <label>Total Seats</label>
              <input name="total_seats" type="number" required />
            </div>
            <div className="input-group">
              <label>Coach Number</label>
              <input name="coach_number" required />
            </div>
            <button type="submit">Add Train</button>
          </form>
        </div>
        <div className="card">
          <h3>Add Pre-Booked Seat</h3>
          <form onSubmit={handleAddSeat} className="form-grid">
            <div className="input-group">
              <label>Train</label>
              <select name="train_id" required>
                {trains.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Coach Number</label>
              <input name="coach_number" required />
            </div>
            <div className="input-group">
              <label>Seat Number</label>
              <input name="seat_number" type="number" required />
            </div>
            <button type="submit">Add Seat</button>
          </form>
        </div>
        <div className="card">
          <h3>Update Train Location</h3>
          <form onSubmit={handleUpdateLocation} className="form-grid">
            <div className="input-group">
              <label>Train</label>
              <select name="train_id" required>
                {trains.map(t => <option key={t._id} value={t._id}>{t.name} - Current: {t.current_location}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Current Location</label>
              <input name="current_location" required className="w-full" />
            </div>
            <button type="submit" className="w-full">Update Location</button>
          </form>
          <div className="mt-4">
            <h4>Quick Updates</h4>
            {trains.map(t => (
              <button key={t._id} onClick={() => handleAutoUpdateLocation(t._id)} className="mr-2 mb-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">
                Update {t.name} to {t.current_location === t.source ? t.destination : t.source}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
