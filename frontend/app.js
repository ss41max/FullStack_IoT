const API_BASE = "https://fullstack-iot.onrender.com";

const statusEl = document.getElementById("status");
const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");

async function setLed(state) {
  try {
    const res = await fetch(`${API_BASE}/led/set?state=${state}`, {
      method: "POST",
    });

    const data = await res.json();
    console.log("LED Updated:", data);
  } catch (err) {
    console.error("Failed to send LED command");
  }
}

async function getStatus() {
  try {
    const res = await fetch(`${API_BASE}/led/status`);
    const data = await res.json();
    statusEl.textContent = "LED: " + data.led;
  } catch (err) {
    statusEl.textContent = "OFFLINE";
  }
}

onBtn.addEventListener("click", () => setLed("ON"));
offBtn.addEventListener("click", () => setLed("OFF"));

setInterval(getStatus, 1500);
