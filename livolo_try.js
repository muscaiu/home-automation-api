var Livolo = require('livolo');

var pin = 11; //physical pin number on raspberry pi gpio

var options = {
  debugMode: true,
  repeats: 150
}

Livolo.open(pin, options);

// Livolo.sendButton(19303, 96);
Livolo.sendButton(6400, 80);

// Livolo.sendButton(6400, 96); // living
// Livolo.sendButton(6400, 106); //all off
