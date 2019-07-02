import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const bedroomId = '4c65a8daa726'
const bedroomScanner = new Scanner(bedroomId);

export default function (client) {
  bedroomScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureBedroom', temperature)
  });

  bedroomScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityBedroom', humidity)
  });

  bedroomScanner.on('batteryChange', function (battery, id) {
    client.emit('batteryBedroom', battery)
  });

  bedroomScanner.on("error", error => console.log(error));
}
