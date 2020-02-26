var Livolo = require('livolo');

var pin = 27; //physical pin number on raspberry pi gpio

var options = {
  debugMode: true,
  repeats: 150
}

Livolo.open(pin, options);
Livolo.sendButton(6400, 120);
