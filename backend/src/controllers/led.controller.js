const {
  publishLedCommand,
  getLedStatus,
} = require("../mqtt/mqttClient");

const setLedState = (req, res) => {
  const { state } = req.body;

  if (!state || !["ON", "OFF"].includes(state)) {
    return res.status(400).json({ error: "Invalid LED state" });
  }

  publishLedCommand(state);
  res.json({ success: true, state });
};

const fetchLedStatus = (req, res) => {
  res.json({ led: getLedStatus() });
};

module.exports = {
  setLedState,
  fetchLedStatus,
};
