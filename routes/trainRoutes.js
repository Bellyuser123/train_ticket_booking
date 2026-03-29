const express = require("express");
const router = express.Router();

const Train = require("../models/Train");

// ADD TRAIN
router.post("/add", async (req, res) => {
  try {
    const { train_name, total_seats } = req.body;

    // create seats automatically
    const seats = [];
    for (let i = 1; i <= total_seats; i++) {
      seats.push({
      seat_number: i,
     status: "available"
     });
}

    const train = new Train({
      train_name,
      total_seats,
      seats
    });

    await train.save();

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

module.exports = router;