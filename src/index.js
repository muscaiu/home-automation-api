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
    var spawn = require("child_process").spawn;
    const process = spawn('python', ["./livolo.py", 'on']);
    process.stdout.on('data', function (data) {
      console.log(data.toString())
    })
  });

  client.on('getTemperatures',  async() => {
    const tremperatures = await models.Temperature.findAll({
      limit: 100,
      where: {},
      order: [['createdAt', 'ASC']]
    })
    client.emit('temperatures', tremperatures)
  })

  sequelize.sync().then(async () => {
    console.log('+++ DB connected')
  });
  
});

server.listen(process.env.PORT);
