const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user_id: String,
  train_id: String,
  seat_number: Number,
  status: {
    type: String,
    enum: ["confirmed", "waiting","notified"],
    default: "waiting"
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);