var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('./bonescript');
 
app.listen(8090);
var ledPin = bone.P8_3;
 
setup = function() {
    pinMode(ledPin, OUTPUT);
};
 
function handler (req, res) {
  fs.readFile('sock123/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
 
    res.writeHead(200);
    res.end(data);
  });
}
 
io.sockets.on('connection', function (socket) {
  socket.on('led', function (data) {
    console.log(data);
    if (data == 'on'){
        digitalWrite(ledPin, HIGH);
          socket.emit('ledstatus', 'green');
          socket.broadcast.emit('ledupdate', 'green');
 
    }else{
        digitalWrite(ledPin, LOW);
        socket.emit('ledstatus', 'red');
         socket.broadcast.emit('ledupdate', 'red');
    }
  });
});
 
bb.run();
