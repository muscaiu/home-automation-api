import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const kitchenId = '4c65a8dae1b7';
const log = { debug() { }, error() { }, warn() { }, info() { } };
const kitchenScanner = new Scanner(kitchenId, { log });

export default function (client) {
  kitchenScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureKitchen', temperature)
  });

  kitchenScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityKitchen', humidity)
  });

  kitchenScanner.on("error", error => console.log(error));
}
