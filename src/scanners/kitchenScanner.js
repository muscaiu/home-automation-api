import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";

const kitchenId = '4c65a8dd7c37';
const kitchenScanner = new Scanner(kitchenId);

export default function (client) {
  kitchenScanner.on("temperatureChange", function (temperature, id) {
    client.emit('temperatureKitchen', temperature)
  });

  kitchenScanner.on("humidityChange", function (humidity, id) {
    client.emit('humidityKitchen', humidity)
  });

  kitchenScanner.on('batteryChange', function (battery, id) {
    client.emit('batteryKitchen', battery)
  });

  kitchenScanner.on("error", error => console.log(error));
}
