import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const vladId = '4c65a8dae1b7';
const vladScanner = new Scanner(vladId);

export default function (client) {
  vladScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureVlad', temperature)
  });

  vladScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityVlad', humidity)
  });

  vladScanner.on('batteryChange', function (battery, id) {
    client.emit('batteryVlad', battery)
  });

  vladScanner.on("error", error => console.log(error));
}
