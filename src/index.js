import 'dotenv/config';
const io = require('socket.io')();

import livingScanner from './scanners/livingScanner';
import bathroomScanner from './scanners/bathroomScanner';
import vladScanner from './scanners/vladScanner';
import kitchenScanner from './scanners/kitchenScanner';

io.set("origins", "*:*");

io.on('connection', (client) => {
  livingScanner(client)
  bathroomScanner(client)
  vladScanner(client)
  kitchenScanner(client)
});

const port = 4001;
io.listen(port);
