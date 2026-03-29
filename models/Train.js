const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seat_number: Number,
  status: {
    type: String,
    enum: ["available", "booked", "not_boarded"],
    default: "available"
  }
});

const trainSchema = new mongoose.Schema({
  train_name: String,
  total_seats: Number,
  seats: [seatSchema]
});

module.exports = mongoose.model("Train", trainSchema);