const express = require("express");
const router = express.Router();

const TTE = require("../models/TTE");
const Seat = require("../models/Seat");

// TTE LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const tte = await TTE.findOne({ email, password });

    if (!tte) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", tte });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE SEAT STATUS
router.put("/seat/:id", async (req, res) => {
  try {
    const { status } = req.body; // "occupied" or "vacant"
    const seat = await Seat.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: "Seat updated", seat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SEATS FOR TRAIN
router.get("/seats/:trainId", async (req, res) => {
  try {
    const seats = await Seat.find({ train_id: req.params.trainId });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;