const mongoose = require("mongoose");

const tteSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("TTE", tteSchema);