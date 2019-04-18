var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

let cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serving static files from "public" folder
app.use(express.static('static'));

// Event Emitter
EventEmitter = require('events');
Stream = new EventEmitter();

var routes = require('./api/routes/findAndFixRoutes');
routes(app);  

app.use(function(req, res) {
  res.status(404).send({error: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('FtF API server successfully started on: ' + port);