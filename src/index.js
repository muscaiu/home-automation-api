import "dotenv/config";

import livingScanner from "./scanners/livingScanner";
import kitchenScanner from "./scanners/kitchenScanner";
import vladScanner from "./scanners/vladScanner";
import bathroomScanner from "./scanners/bathroomScanner";
import { tempCron } from "./crons/tempCron";
import models, { sequelize } from "./models";
// import Livolo from "livolo";

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// const pin = 11;
// const options = {
//   debugMode: true,
//   repeats: 150,
// };
tempCron.start();

io.set("origins", "*:*");

io.on("connection", (client) => {
  livingScanner(client);
  kitchenScanner(client);
  vladScanner(client);
  bathroomScanner(client);

  // client.on("toggleLiving", () => {
  //   console.log("toggleLiving");
  //   Livolo.open(pin, options);
  //   Livolo.sendButton(6400, 80); // terasa

  //   // var spawn = require("child_process").spawn;
  //   // const process = spawn('python', ["./livolo.py", 'on']);
  //   // process.stdout.on('data', function (data) {
  //   //   console.log('process.strdout', data.toString('utf8'))
  //   // })
  // });

  // client.on("toggleEntrance", () => {
  //   console.log("toggleLiving");
  //   Livolo.open(pin, options);
  //   Livolo.sendButton(6400, 96); //living
  // });

  client.on("getTemperatures", async () => {
    const living = await models.Living.findAll({
      limit: 120,
      where: {},
      order: [["createdAt", "DESC"]],
    });
    const kitchen = await models.Kitchen.findAll({
      limit: 120,
      where: {},
      order: [["createdAt", "DESC"]],
    });
    const vlad = await models.Vlad.findAll({
      limit: 120,
      where: {},
      order: [["createdAt", "DESC"]],
    });
    const bathroom = await models.Bathroom.findAll({
      limit: 120,
      where: {},
      order: [["createdAt", "DESC"]],
    });
    client.emit("temperatures", { living, kitchen, vlad, bathroom });
  });

  sequelize.sync().then(async () => {
    console.log("+++ DB connected");
  });
});

server.listen(process.env.PORT);
