import { useState } from "react";
import { confirmSeat } from "../services/api";

const TTE = () => {
  const [trainId, setTrainId] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState(null);

  const handleConfirm = async (event) => {
    event.preventDefault();
    try {
      const response = await confirmSeat({ train_id: trainId, user_id: userId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Confirmation failed");
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">TTE Panel</h1>
      {message && <div className="alert">{message}</div>}
      <form className="form-grid">
        <div className="input-group">
          <label>Train ID</label>
          <input value={trainId} onChange={(e) => setTrainId(e.target.value)} placeholder="Train document _id" />
        </div>
        <div className="input-group">
          <label>User ID</label>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User document _id" />
        </div>
        <button onClick={handleConfirm}>Confirm Seat</button>
      </form>
      <p className="status-line">If a waiting ticket has been notified, the TTE can confirm the seat here.</p>
    </section>
  );
};

export default TTE;
