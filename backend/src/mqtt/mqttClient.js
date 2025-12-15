const { io } = require("../server");

client.on("message", (topic, message) => {
  if (topic === "esp32/led/status") {
    ledStatus = message.toString();
    console.log("💡 LED Status:", ledStatus);

    // 🔥 Send live update to frontend
    io.emit("ledStatus", ledStatus);
  }
});
