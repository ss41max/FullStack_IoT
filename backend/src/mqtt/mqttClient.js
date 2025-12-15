const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_BROKER_URL || "mqtt://test.mosquitto.org");

// When connected
client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

// When receiving messages
client.on("message", (topic, message) => {
  console.log(`Received message: ${message} from topic: ${topic}`);
});

module.exports = client;
