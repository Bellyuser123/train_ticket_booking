const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userRoutes");
const trainRoutes = require("./routes/trainRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tteRoutes = require("./routes/tteRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tte", tteRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected");

  // Seed dummy data
  const Train = require("./models/Train");
  const Seat = require("./models/Seat");
  const User = require("./models/User");
  const TTE = require("./models/TTE");

  // Check if data exists
  const trainCount = await Train.countDocuments();
  if (trainCount === 0) {
    // Add dummy train
    const train = new Train({
      name: "Express 101",
      number: "EXP101",
      source: "Delhi",
      destination: "Mumbai",
      departure_time: "10:00 AM",
      current_location: "Delhi"
    });
    await train.save();

    // Add seats
    const seats = [];
    for (let i = 1; i <= 50; i++) {
      seats.push({
        train_id: train._id,
        coach_number: "A1",
        seat_number: i,
        status: i <= 10 ? "occupied" : "vacant" // Some pre-booked
      });
    }
    await Seat.insertMany(seats);

    // Add dummy user
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password"
    });
    await user.save();

    // Add dummy TTE
    const tte = new TTE({
      email: "tte@example.com",
      password: "password"
    });
    await tte.save();

    console.log("Dummy data seeded");
  }
})
.catch(err => console.log(err));

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// this is a comment 

