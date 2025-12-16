const API_BASE = "https://fullstack-iot.onrender.com";

const statusEl = document.getElementById("status");
const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");

// Set LED (ON/OFF)
async function setLed(state) {
  try {
    const res = await fetch(`${API_BASE}/led/set?state=${state}`, { method: "POST" });
    const data = await res.json();
    console.log("LED Updated:", data);
  } catch (err) {
    console.log("Failed to update LED");
  }
}

// Fetch latest LED status
async function getStatus() {
  try {
    const res = await fetch(`${API_BASE}/led/status`);
    const data = await res.json();
    statusEl.textContent = data.led;
    statusEl.style.color = data.led === "ON" ? "#0fcf53" : "#ff4747";
  } catch {
    statusEl.textContent = "OFFLINE";
    statusEl.style.color = "#ccc";
  }
}

onBtn.addEventListener("click", () => setLed("ON"));
offBtn.addEventListener("click", () => setLed("OFF"));

setInterval(getStatus, 1500);
