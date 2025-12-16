#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

const char* ssid = "ASP-45";
const char* pass = "kkkkkkkk";

const int ledPin = 2;   // ESP32 built‑in LED (usually GPIO 2)

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);

  String payload = "";
  for (int i = 0; i < length; i++) {
    payload += (char)message[i];
  }

  Serial.print("Payload: ");
  Serial.println(payload);

  if (payload == "ON") {
    digitalWrite(ledPin, HIGH);
    Serial.println("LED TURNED ON");
  } 
  else if (payload == "OFF") {
    digitalWrite(ledPin, LOW);
    Serial.println("LED TURNED OFF");
  }

  // publish status back
  client.publish("esp32/led/status", payload.c_str());
}

void setup() {
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);

  WiFi.begin(ssid, pass);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWiFi Connected!");

  client.setServer("broker.hivemq.com", 1883);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("esp32_test")) {
      Serial.println("MQTT Connected");
    } else {
      Serial.print("Failed: ");
      Serial.println(client.state());
      delay(2000);
    }
  }

  client.subscribe("esp32/led/set");
  Serial.println("Subscribed to esp32/led/set");
}

void loop() {
  client.loop();
}
