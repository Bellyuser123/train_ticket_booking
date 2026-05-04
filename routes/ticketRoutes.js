const express = require("express");
const router = express.Router();

const Train = require("../models/Train");
const Ticket = require("../models/Ticket");
const Seat = require("../models/Seat");

// BOOK TICKET
router.post("/book", async (req, res) => {
  try {
    const { user_id, train_id, coach_number, seat_number } = req.body;

    const seat = await Seat.findOne({ train_id, coach_number, seat_number, status: "vacant" });

    if (!seat) {
      return res.status(400).json({ error: "Seat not available" });
    }

    seat.status = "occupied";

    const ticket = new Ticket({
      user_id,
      train_id,
      coach_number,
      seat_number,
      status: "confirmed"
    });

    await seat.save();
    await ticket.save();

    res.json({ message: "Ticket booked", ticket });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MARK NOT BOARDED + NOTIFY ONLY
router.post("/not-boarded", async (req, res) => {
  try {
    const { train_id, seat_number } = req.body;

    const seat = await Seat.findOne({ train_id, seat_number, status: "occupied" });

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    seat.status = "vacant";

    // Find waiting user
    const waitingTicket = await Ticket.findOne({
      train_id,
      status: "waiting"
    });

    if (waitingTicket) {
      waitingTicket.status = "notified";
      await waitingTicket.save();
      await seat.save();
      return res.json({
        message: "User notified for seat confirmation"
      });
    }

    await seat.save();

    res.json({
      message: "No waiting users, seat available"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CONFIRM SEAT
router.post("/confirm-seat", async (req, res) => {
  try {
    const { user_id, train_id } = req.body;

    const ticket = await Ticket.findOne({
      user_id,
      train_id,
      status: "notified"
    });

    if (!ticket) {
      return res.status(404).json({ error: "No notified ticket found" });
    }

    const seat = await Seat.findOne({ train_id, coach_number: ticket.coach_number, seat_number: ticket.seat_number, status: "vacant" });

    if (!seat) {
      return res.status(400).json({ error: "No seat available" });
    }

    seat.status = "occupied";
    ticket.status = "confirmed";

    await seat.save();
    await ticket.save();

    res.json({
      message: "Seat confirmed",
      ticket
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OPEN SEAT FOR ALL
router.post("/open-seat", async (req, res) => {
  try {
    const { train_id, seat_number } = req.body;

    const seat = await Seat.findOne({ train_id, seat_number });

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    seat.status = "vacant";

    await seat.save();

    res.json({
      message: "Seat is now open for all users"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;