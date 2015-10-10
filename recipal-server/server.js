/**
 * server.js
 */
var http        = require('http'),
    express     = require('express'), 
    app         = express(), 
    path        = require('path'), 
    config      = require('./config/config.js')(), 
    log         = require('./config/log.js')(),
    mongoose    = require('mongoose');


mongoose.connection.on('connecting', function () {
  log.debug('Mongoose default connection is connecting');
});

mongoose.connection.on('open', function () {
  log.debug('Mongoose default connection is opened');
});

mongoose.connection.on('connected', function () {
  log.debug('Mongoose default connection open to ' + config.db);
});

mongoose.connection.on('error',function (err) {
  log.debug('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  log.debug('Mongoose default connection disconnected');
});

mongoose.connect(config.db);
mongoose.set('debug', true);

var models_dir = __dirname + '/models';
// fs.readdirSync(models_dir).forEach(function (file) {
//   if(file[0] === '.') return; 
//   require(models_dir+'/'+ file);
// });


// express environments
app.set('views', __dirname + '/views');

app.set("ipaddr", config.host);
app.set("port", config.port);

app.use(express.static(path.join(__dirname, 'public')));

var server = http.Server(app);
var io = require('socket.io')(server);
require('./lib/fileSocket')(io);

require('./config/routes')(app, log);

server.listen(app.get("port"), function() {
  console.log(config.app.name+" up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

if (process.send) {
  process.send('listening');
};

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
