var Topics = require('../models/topics.js');

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// GET Lista de temp1 de la DB

router.get('/temp1', function(req, res){
  Topics.find({TopicTema: "t1"},{TopicTime: 1, TopicValue: 1, _id: 0}, function(err, docs) {
    res.json(docs);
  });
});

// GET Lista de hum1 de la DB
var datos;
router.get('/hum1', function(req, res){
  Topics.find({TopicTema: "h1"},{TopicTime: 1, TopicValue: 1, _id: 0}, function(err, docs) {
     res.json(docs);
  });
});
module.exports = router;
