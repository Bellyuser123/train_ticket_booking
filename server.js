const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userRoutes");
const trainRoutes = require("./routes/trainRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/tickets", ticketRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// this is a comment 

