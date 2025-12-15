const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://broker.hivemq.com");

let ledStatus = "OFF";

client.on("connect", () => {
  console.log("MQTT Connected");
  client.subscribe("esp32/led/status");
});

client.on("message", (topic, message) => {
  if (topic === "esp32/led/status") {
    ledStatus = message.toString();
    console.log("LED STATUS:", ledStatus);
  }
});

function publishLedCommand(state) {
  client.publish("esp32/led/set", state);
}

function getLedStatus() {
  return ledStatus;
}

module.exports = {
  client,
  publishLedCommand,
  getLedStatus
};
