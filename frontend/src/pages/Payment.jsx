import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("rapidBooking");
    if (stored) {
      setBooking(JSON.parse(stored));
    } else {
      navigate("/trains");
    }
  }, [navigate]);

  const handlePayment = () => {
    // Fake payment, just redirect to confirm
    navigate("/confirm");
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <section className="page-card">
      <h1 className="section-title">Payment</h1>
      <div className="card">
        <h2>Booking Summary</h2>
        <p><strong>Train:</strong> {booking.train.name} ({booking.train.number})</p>
        <p><strong>Seat:</strong> {booking.seat.coach_number}-{booking.seat.seat_number}</p>
        <p><strong>User:</strong> {booking.user.name}</p>
      </div>
      <div className="section-grid">
        <div className="card">
          <h3>Payment Methods</h3>
          <div className="form-grid">
            <label>
              <input type="radio" name="method" value="upi" defaultChecked /> UPI
            </label>
            <label>
              <input type="radio" name="method" value="card" /> Card
            </label>
            <label>
              <input type="radio" name="method" value="netbanking" /> Net Banking
            </label>
          </div>
        </div>
        <div className="card">
          <h3>Payment Details</h3>
          <div className="input-group">
            <label>UPI ID / Card Number</label>
            <input placeholder="Enter UPI ID or card number" />
          </div>
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </section>
  );
};

export default Payment;