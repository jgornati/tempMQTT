var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  TopicClientId: String,
  TopicTema: String,
  TopicValue: String,
  TopicTime: Date
});

var topicsModel = mongoose.model('Topics', topicSchema);
module.exports = topicsModel;
