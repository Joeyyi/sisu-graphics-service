var express = require('express');
var app = express();
var request = require('request');

var campus = require('./routes/campus');
var view = require('./routes/view');

app.use('/campus', campus);
app.use('/view', view);
app.use(express.static('public'))

var server = app.listen(process.env.PORT || 3000, 'localhost', () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('serving at http://%s:%s', host, port)
})