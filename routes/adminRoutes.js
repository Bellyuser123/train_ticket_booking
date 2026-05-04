const express = require("express");
const router = express.Router();

const Seat = require("../models/Seat");

// ADD PRE-BOOKED SEAT
router.post("/add-seat", async (req, res) => {
  try {
    const { train_id, coach_number, seat_number } = req.body;

    const seat = new Seat({
      train_id,
      coach_number,
      seat_number,
      status: "occupied"
    });

    await seat.save();

    res.json({ message: "Pre-booked seat added", seat });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;