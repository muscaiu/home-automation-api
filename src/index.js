import 'dotenv/config';
const io = require('socket.io')();

import livingScanner from './scanners/livingScanner';
import bathroomScanner from './scanners/bathroomScanner';
import vladScanner from './scanners/vladScanner';
import kitchenScanner from './scanners/kitchenScanner';

import {tempCron} from './crons/tempCron';
import models, { sequelize } from './models';

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

  sequelize.sync().then(async () => {
    console.log('+++ DB connected')
  });
  
});

io.listen(process.env.PORT);
