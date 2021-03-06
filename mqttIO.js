var mosca = require('mosca');
var Topics = require('./models/topics.js');
var io = module.parent.exports.io;

var moscaSettings = {
  port: 1883
};

var authenticate = function(client, username, password, callback) {
  var authorized = (username === 'joel' && password.toString() === 'asd');
  if (authorized) client.user = username;
  callback(null, authorized);
};


var servermqtt = new mosca.Server(moscaSettings);

servermqtt.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
servermqtt.on('published', function(packet, client) {
  console.log('Published ' + packet.payload);
  // console.log('Published ' + packet.topic);
  // console.log('Published ' + client);
  console.log(Date());
  var t = new Topics({
    TopicTime: Date(),
    TopicTema: packet.topic,
    TopicValue: packet.payload
  });
  t.save(function(err, doc){
    if(!err){
      console.log("guarde el paquete");
      if(packet.topic == 't1'){
        io.sockets.emit('t1', {tema: String(packet.topic), valor: String(packet.payload)});
      }
      if(packet.topic == 'h1'){
        io.sockets.emit('h1', {tema: String(packet.topic), valor: String(packet.payload)});
      }
      io.sockets.emit('topic', {tema: String(packet.topic), valor: String(packet.payload)});
    }else{
      console.log("error al guardar papquete");
      console.log(doc);
    }
  });
});

servermqtt.on('ready', function setup() {
  servermqtt.authenticate = authenticate;
  console.log('Mosca server is up and running')
});


module.exports = servermqtt;
