import { Scanner } from "homebridge-mi-hygrothermograph/lib/scanner";
import models from "../models";

const CronJob = require("cron").CronJob;
const log = { debug() {}, error() {}, warn() {}, info() {} };

const livingId = "4c65a8daa726";
const kitchenId = "4c65a8dae1b7";
const vladId = "4c65a8dd7fc9";
const bathroomId = "4c65a8dd7c37";

const livingScanner = new Scanner(livingId, { log });
const kitchenScanner = new Scanner(kitchenId, { log });
const vladScanner = new Scanner(vladId, { log });
const bathroomScanner = new Scanner(bathroomId, { log });

let livingTemperature = 0;
let livingHumidity = 0;
let kitchenTemperature = 0;
let kitchenHumidity = 0;
let bathroomTemperature = 0;
let bathroomHumidity = 0;
let vladTemperature = 0;
let vladHumidity = 0;

livingScanner.on("temperatureChange", function (temperature, id) {
  livingTemperature = temperature;
});
livingScanner.on("humidityChange", function (humidity, id) {
  livingHumidity = humidity;
});
kitchenScanner.on("temperatureChange", function (temperature, id) {
  kitchenTemperature = temperature;
});
kitchenScanner.on("humidityChange", function (humidity, id) {
  kitchenHumidity = humidity;
});
bathroomScanner.on("temperatureChange", function (temperature, id) {
  bathroomTemperature = temperature;
});
bathroomScanner.on("humidityChange", function (humidity, id) {
  bathroomHumidity = humidity;
});
vladScanner.on("temperatureChange", function (temperature, id) {
  vladTemperature = temperature;
});
vladScanner.on("humidityChange", function (humidity, id) {
  vladHumidity = humidity;
});

// Every minute
const tempCron = new CronJob(`0 * * * * *`, async function () {
  console.log(new Date().toLocaleTimeString());
  await models.Living.create({
    temperature: livingTemperature,
    humidity: livingHumidity,
  });
  await models.Kitchen.create({
    temperature: kitchenTemperature,
    humidity: kitchenHumidity,
  });
  await models.Vlad.create({
    temperature: vladTemperature,
    humidity: vladHumidity,
  });
  await models.Bathroom.create({
    temperature: bathroomTemperature,
    humidity: bathroomHumidity,
  });
});

module.exports = {
  tempCron,
  livingTemperature,
  livingHumidity,
  kitchenTemperature,
  kitchenHumidity,
  bathroomTemperature,
  bathroomHumidity,
  vladTemperature,
  vladHumidity,
};
