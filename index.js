'use strict';

var restify = require('restify');
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || '3007';


var server = restify.createServer({
  name: 'Things API Server'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(function logger(req,res,next) {
  console.log(new Date(),req.method,req.url);
  next();
});

server.get('/me', (req, res) => {
  res.json({name:'foo'})
})

server.on('uncaughtException',function(request, response, route, error){
  console.error(error.stack);
  response.send(error);
});

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
