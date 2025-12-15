const express = require("express");
const router = express.Router();
const client = require("../mqtt/mqttClient");
const { publishLedCommand, getLedStatus } = require("../mqtt/mqttClient");

router.post("/toggle", (req, res) => {
  const newState = getLedStatus() === "OFF" ? "ON" : "OFF";
  publishLedCommand(newState);
  res.json({ success: true, led: newState });
});

router.post("/set", (req, res) => {
  const state = req.query.state;
  if (!["ON", "OFF"].includes(state)) {
    return res.status(400).json({ error: "Invalid state" });
  }
  publishLedCommand(state);
  res.json({ success: true, led: state });
});


router.get("/status", (req, res) => {
  res.json({ led: getLedStatus() });
});

module.exports = router;
