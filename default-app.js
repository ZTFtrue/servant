var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var http = require('http');
var port = normalizePort('3000');
var app = express();
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.send({
      error: 'Not found'
    });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  console.log(addr);
}

// app.set('port', port);
// app.get('/', function (req, res, next) {
//   res.send('respond with a resource///q');
// });
// app.get('/users', function (req, res, next) {
//   res.send('respond with a resource');
// });
