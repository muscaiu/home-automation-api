var spawn = require("child_process").spawn;

var process = spawn('python', ["./livolo.py", 'on']);

process.stdout.on('data', function (data) {
  console.log(data.toString())
}) 
console.log('object')