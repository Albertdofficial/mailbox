const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv").config();

const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());

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
  app.use('/message', messageRoutes)
  app.use('/api/user', userRoutes)
