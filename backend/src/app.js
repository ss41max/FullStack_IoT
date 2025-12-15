const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ledRoutes = require("./routes/led.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/led", ledRoutes);

app.get("/", (req, res) => {
  res.send("IoT Backend Running");
});

module.exports = app;
