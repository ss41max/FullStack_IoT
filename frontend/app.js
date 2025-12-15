// Backend API
const API_BASE = "https://fullstack-iot.onrender.com";

const statusEl = document.getElementById("status");
const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");

// No socket.io because render backend is not running socket.io
// Remove: const socket = io("http://localhost:3000");

// Send LED ON/OFF command
async function setLed(state) {
  try {
    const res = await fetch(`${API_BASE}/led/${state.toLowerCase()}`);
    const data = await res.json();
    console.log("LED Response:", data);
  } catch (err) {
    console.error("Error sending LED command", err);
  }
}

// Get status every second
async function getStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`);
    const data = await res.json();
    statusEl.textContent = "LED: " + data.led;
  } catch (err) {
    statusEl.textContent = "OFFLINE";
  }
}

// Button events
onBtn.addEventListener("click", () => setLed("ON"));
offBtn.addEventListener("click", () => setLed("OFF"));

// Auto refresh status
setInterval(getStatus, 1000);
