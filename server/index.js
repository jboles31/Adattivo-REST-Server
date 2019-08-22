var express = require('express');
var mongoose = require('mongoose');
var db = require('../database-mongo/index');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/getAll', (req, res) => {

  db.selectAll((err, results) => {
    if (err) { res.sendStatus(404) }
    res.send(results)
  })
  
})

mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true}, (err) => {
  if (err) { throw error }
  app.listen(3000, function() {
    console.log('listening on port 3000!');
  });
});


