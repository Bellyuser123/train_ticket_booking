const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  train_id: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  coach_number: String,
  seat_number: Number,
  status: {
    type: String,
    enum: ["vacant", "occupied"],
    default: "vacant"
  }
});

module.exports = mongoose.model("Seat", seatSchema);