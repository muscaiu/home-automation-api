import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const vladId = '4c65a8dae1b7';
const log = { debug() { }, error() { }, warn() { }, info() { } };
const vladScanner = new Scanner(vladId, { log });

export default function (client) {
  vladScanner.on("temperatureChange", function (temperature, id) {
    console.log('temperatureVlad' , temperature)
    client.emit('temperatureVlad', temperature)
  });

  vladScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityVlad', humidity)
  });

  vladScanner.on("error", error => console.log(error));
}
