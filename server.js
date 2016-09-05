var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

mongoose.connect('mongodb://localhost:27017/test');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());                                 
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text()); 

require('./app/routes.js')(app);

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});