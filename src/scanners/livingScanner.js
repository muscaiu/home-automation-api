import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const livingId = '4c65a8dd7fc9'
const livingScanner = new Scanner(livingId);

export default function (client) {
  livingScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureLiving', temperature)
  });

  livingScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityLiving', humidity)
  });

  livingScanner.on('batteryChange', function (battery, id) {
    client.emit('batteryLiving', battery)
  });

  livingScanner.on("error", error => console.log(error));
}
