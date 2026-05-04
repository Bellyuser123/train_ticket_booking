const express = require("express");
const router = express.Router();

const Train = require("../models/Train");
const Seat = require("../models/Seat");

// ADD TRAIN
router.post("/add", async (req, res) => {
  try {
    const { name, number, source, destination, departure_time, total_seats, coach_number } = req.body;

    const train = new Train({
      name,
      number,
      source,
      destination,
      departure_time
    });

    await train.save();

    // Create seats
    const seats = [];
    for (let i = 1; i <= total_seats; i++) {
      seats.push({
        train_id: train._id,
        coach_number,
        seat_number: i,
        status: "vacant"
      });
    }
    await Seat.insertMany(seats);

    res.json({ message: "Train added successfully", train });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL TRAINS
router.get("/", async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE TRAIN LOCATION
router.put("/:id/location", async (req, res) => {
  try {
    const { current_location } = req.body;
    const train = await Train.findByIdAndUpdate(req.params.id, { current_location }, { new: true });
    res.json({ message: "Location updated", train });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;