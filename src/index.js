import 'dotenv/config';
const io = require('socket.io')();

import livingScanner from './scanners/livingScanner';
import bathroomScanner from './scanners/bathroomScanner';
import vladScanner from './scanners/vladScanner';
import kitchenScanner from './scanners/kitchenScanner';

io.set("origins", "*:*");

io.on('connection', (client) => {
  client.on('toggleLiving', () => {
    var spawn = require("child_process").spawn;
    
    const process = spawn('python', ["./livolo.py", 'on']);
    
    process.stdout.on('data', function (data) {
      console.log(data.toString())
    })
  });
  livingScanner(client)
  bathroomScanner(client)
  vladScanner(client)
  kitchenScanner(client)
});

const port = 4001;
io.listen(port);
