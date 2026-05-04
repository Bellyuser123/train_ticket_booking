const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: String,
  number: String,
  source: String,
  destination: String,
  departure_time: String,
  current_location: { type: String, default: "Station" }
});

module.exports = mongoose.model("Train", trainSchema);