var Topic = require('../models/topics');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mqttDB');

var p = new Topic({
  TopicClientId: "joel",
  TopicTema: "temperature",
  TopicValue: "14.5",
  TopicMsgId: "msg1",
  TopicTime: new Date()
});

p.save(function(err, doc){
  console.log(err, doc);
});
