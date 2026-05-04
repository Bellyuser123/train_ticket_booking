import { useEffect, useState } from "react";

const BookingConfirmation = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("rapidBooking");
    if (stored) {
      setBooking(JSON.parse(stored));
      localStorage.removeItem("rapidBooking"); // Clear after showing
    }
  }, []);

  if (!booking) {
    return (
      <section className="page-card">
        <h1 className="section-title">Booking Confirmation</h1>
        <p>No recent booking found. Please choose a train and book a seat first.</p>
      </section>
    );
  }

  return (
    <section className="page-card">
      <h1 className="section-title">Booking Successful!</h1>
      <div className="card">
        <p>
          <strong>User:</strong> {booking.user.name} ({booking.user.email})
        </p>
        <p>
          <strong>Train:</strong> {booking.train.name} ({booking.train.number})
        </p>
        <p>
          <strong>Seat:</strong> {booking.seat.coach_number}-{booking.seat.seat_number}
        </p>
        <p>
          <strong>Status:</strong> {booking.ticket.status}
        </p>
      </div>
    </section>
  );
};

export default BookingConfirmation;
