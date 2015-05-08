var mosca = require('mosca')
var io = require('socket.io').listen(4500);
var dbsetting = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'mqttDB',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: dbsetting,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};

var authenticate = function(client, username, password, callback) {
  var authorized = (username === 'joel' && password.toString() === 'asd');
  if (authorized) client.user = username;
  callback(null, authorized);
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published ' + packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  console.log('Mosca server is up and running')
}
