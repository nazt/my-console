
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  socket = require('./routes/socket.js');

var app = module.exports = express();
var server = require('http').createServer(app)
  , exphbs     = require('express3-handlebars')
  , expressWinston = require('express-winston')
  , winston    = require('winston')


// Hook Socket.io into Express
var io = require('socket.io').listen(server);
io.set('log level', 0);


const redis = require('redis');
const client = redis.createClient();


var hbs = exphbs.create({
  defaultLayout: 'main',
  // helpers: helpers
});
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  // app.set('view engine', 'jade');
  app.set('view engine', 'handlebars');
  app.engine('handlebars', hbs.engine);

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  // Use winston logger
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true
      })
    ]
  }));  
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



// Routes

app.get('/', routes.index);

app.get('/partials/:name', routes.partials);
app.get('/rfid/:tagId', routes.readTag);
app.get('/sensor/:sensorMsg', routes.readSensor);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication

io.sockets.on('connection', socket);

// Start server

server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
