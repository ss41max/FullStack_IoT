# FullStack_IoT
✅ Project Architecture (Brief Explanation)
Your project is a Full‑Stack IoT system with three layers:

1️⃣ Frontend (Client-Side)
Folder: frontend/
Files:

index.html → UI for LED control

style.css → Styling

app.js → Sends API requests to backend (/led/set, /led/status)

Role:
This part gives the user buttons to turn the LED ON/OFF and displays the current LED status by calling your backend.

2️⃣ Backend (Node.js + Express)
Folder: backend/src/

Main Components:
✔ 1. Routes → routes/led.routes.js
Handles HTTP requests from frontend:

POST /led/set?state=ON

GET /led/status

This route calls publishLedCommand() and reads getLedStatus().

✔ 2. MQTT Layer → mqtt/mqttClient.js
This file handles all communication with the MQTT broker:

Connects to broker.hivemq.com

Subscribes to esp32/led/status

Updates ledStatus

Publishes LED commands to esp32/led/set

Essentially it bridges backend ↔ MQTT ↔ ESP32.

✔ 3. Express App → app.js
Initializes Express and attaches the /led routes.

✔ 4. Backend Server → server.js
Starts the backend server on Render.

3️⃣ ESP32 Firmware (Microcontroller)
Your ESP32 code:

Connects to WiFi

Connects to HiveMQ MQTT broker

Subscribes to esp32/led/set

Controls LED based on messages

Publishes LED status (ON/OFF) to backend

🔥 How Everything Works Together
1. User clicks ON/OFF on frontend
⟶ app.js sends request → POST /led/set?state=ON

2. Backend receives it
⟶ Calls publishLedCommand("ON")
⟶ Sends MQTT message to topic: esp32/led/set

3. ESP32 receives MQTT message
⟶ Turns LED ON/OFF
⟶ Publishes new status to topic: esp32/led/status

4. Backend listens to status topic
⟶ Updates ledStatus variable
⟶ Frontend reads /led/status every 1.5 seconds

5. Frontend displays live LED status
