const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS options
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders: '*'
};

// apply cors
app.use(cors(corsOptions));


// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// routes
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

// serve frontend
