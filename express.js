var express = require('express');
var app = express();
var server = require('http').Server(app);
var server_port = process.env.PORT || 8080
var server_ip_address = process.env.SERVER_URL || '127.0.0.1'
var replify = require('replify');
// create the switchboard
var switchboard = require('rtc-switchboard')(server);

server.listen(server_port, function(err) {
  if (err) {
    return console.log('Encountered error starting server: ', err);
  }

  console.log('server running at '+server_ip_address+':' + server_port + '/');
});

replify({
  name: 'switchboard',
  app: switchboard,
  contexts: {
    server: server
  }
});

switchboard.on('room:create', function(room) {
  console.log('room ' + room + ' created, now have ' + switchboard.rooms.length + ' active rooms');
});

switchboard.on('room:destroy', function(room) {
  console.log('room ' + room + ' destroyed, ' + switchboard.rooms.length + ' active rooms remain');

  if (typeof gc == 'function') {
    console.log('gc');
    gc();
  }
});