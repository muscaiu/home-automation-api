import 'dotenv/config';

import livingScanner from './scanners/livingScanner';
import bathroomScanner from './scanners/bathroomScanner';
import vladScanner from './scanners/vladScanner';
import kitchenScanner from './scanners/kitchenScanner';
import {tempCron} from './crons/tempCron';
import models, { sequelize } from './models';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

tempCron.start();

io.set("origins", "*:*");

io.on('connection', (client) => {
  livingScanner(client)
  bathroomScanner(client)
  vladScanner(client)
  kitchenScanner(client)

  client.on('toggleLiving', () => {
    console.log('toggleLiving')
    var spawn = require("child_process").spawn;
    const process = spawn('python', ["./livolo.py", 'on']);
    process.stdout.on('data', function (data) {
      console.log(data.toString())
    })
  });

  // client.on('toggleEntrance', () => {
  //   console.log('toggleEntrance:')
  //   var spawn = require("child_process").spawn;
  //   const process = spawn('python', ["./livolo_entrance.py", 'on']);
  //   process.stdout.on('data', function (data) {
  //     console.log(data.toString())
  //   })
  // });

  client.on('getTemperatures',  async() => {
    const living = await models.Living.findAll({
      limit: 100,
      where: {},
      order: [['createdAt', 'DESC']]
    })
    const kitchen = await models.Kitchen.findAll({
      limit: 100,
      where: {},
      order: [['createdAt', 'DESC']]
    })
    const vlad = await models.Vlad.findAll({
      limit: 100,
      where: {},
      order: [['createdAt', 'DESC']]
    })
    const bathroom = await models.Bathroom.findAll({
      limit: 100,
      where: {},
      order: [['createdAt', 'DESC']]
    })
    client.emit('temperatures', {living, kitchen, vlad, bathroom})
  })

  sequelize.sync().then(async () => {
    console.log('+++ DB connected')
  });
});

server.listen(process.env.PORT);
