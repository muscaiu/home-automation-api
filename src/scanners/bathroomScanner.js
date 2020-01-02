import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const bathroomId = '4c65a8dd7c37';
const log = { debug() { }, error() { }, warn() { }, info() { } };
const bathroomScanner = new Scanner(bathroomId, { log });

export default function (client) {
  bathroomScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureBathroom', temperature)
  });

  bathroomScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityBathroom', humidity)
  });

  // bathroomScanner.on('batteryChange', function (battery, id) {
  //   client.emit('batteryBathroom', battery)
  // });

  bathroomScanner.on("error", error => console.log(error));
}
