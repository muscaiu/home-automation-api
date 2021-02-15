import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const livingId = "4c65a8daa726";
const log = { debug() {}, error() {}, warn() {}, info() {} };
const livingScanner = new Scanner(livingId, { log });

export default function (client) {
  livingScanner.on("temperatureChange", function (temperature, id) {
    client.emit("temperatureLiving", temperature);
  });

  livingScanner.on("humidityChange", function (humidity, id) {
    client.emit("humidityLiving", humidity);
  });

  livingScanner.on("error", (error) => console.log(error));
}
