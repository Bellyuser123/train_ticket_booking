const express = require("express");
const router = express.Router();

const Train = require("../models/Train");
const Ticket = require("../models/Ticket");

// BOOK TICKET
router.post("/book", async (req, res) => {
  try {
    const { user_id, train_id } = req.body;

    const train = await Train.findById(train_id);

    // find available seat
    const availableSeat = train.seats.find(
      (seat) => seat.status === "available" || seat.status === "open"
    );

    let ticket;

    if (availableSeat) {
      // assign seat
      availableSeat.status = "booked";

      ticket = new Ticket({
        user_id,
        train_id,
        seat_number: availableSeat.seat_number,
        status: "confirmed"
      });

    } else {
      // waiting list
      ticket = new Ticket({
        user_id,
        train_id,
        status: "waiting"
      });
    }

    await train.save();
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

    const train = await Train.findById(train_id);

    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    const seat = train.seats.find(
      (s) => s.seat_number === seat_number
    );

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // Step 1: mark seat as not boarded
    seat.status = "not_boarded";

    // Step 2: find waiting user
    const waitingTicket = await Ticket.findOne({
      train_id,
      status: "waiting"
    });

    if (waitingTicket) {
      // ONLY notify, don't assign
      waitingTicket.status = "notified";
      await waitingTicket.save();

      await train.save();

      return res.json({
        message: "User notified for seat confirmation"
      });
    }

    await train.save();

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

    // find notified ticket
    const ticket = await Ticket.findOne({
      user_id,
      train_id,
      status: "notified"
    });

    if (!ticket) {
      return res.status(404).json({ error: "No notified ticket found" });
    }

    // find train
    const train = await Train.findById(train_id);

    // find seat which was not boarded
    const seat = train.seats.find(
      (s) => s.status === "not_boarded"
    );

    if (!seat) {
      return res.status(400).json({ error: "No seat available" });
    }

    // assign seat
    seat.status = "booked";
    ticket.seat_number = seat.seat_number;
    ticket.status = "confirmed";

    await train.save();
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

    const train = await Train.findById(train_id);

    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    const seat = train.seats.find(
      (s) => s.seat_number === seat_number
    );

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // make seat open
    seat.status = "open";

    await train.save();

    res.json({
      message: "Seat is now open for all users"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;