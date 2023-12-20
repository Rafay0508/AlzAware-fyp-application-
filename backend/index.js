const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(3000, () => {
  console.log("server is running at port " + process.env.PORT);
});
