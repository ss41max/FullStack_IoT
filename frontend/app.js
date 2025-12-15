const API_BASE = "http://localhost:3000/api";

const statusEl = document.getElementById("status");
const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");
const socket = io("http://localhost:3000");

async function setLed(state) {
    socket.on("ledStatus", (status) => {
  document.getElementById("status").textContent = "LED: " + status;
});
document.getElementById("onBtn").onclick = () => {
  fetch("/led/set?state=ON", { method: "POST" });
};

document.getElementById("offBtn").onclick = () => {
  fetch("/led/set?state=OFF", { method: "POST" });
};

  try {
    await fetch(`${API_BASE}/led`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });
  } catch (err) {
    console.error("Failed to send command");
  }
}

async function getStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`);
    const data = await res.json();
    statusEl.textContent = data.led;
  } catch (err) {
    statusEl.textContent = "OFFLINE";
  }
}

onBtn.addEventListener("click", () => setLed("ON"));
offBtn.addEventListener("click", () => setLed("OFF"));

setInterval(getStatus, 1000);
