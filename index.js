'use strict';

var restify = require('restify');
var port = process.env.PORT || '3007';


var server = restify.createServer({
  name: 'Things API Server'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use((req,res,next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

server.get('/', (req, res) => {
  res.json(server.name);
});

server.get('/me', (req, res) => {
  res.json({name:'foo'})
});

server.on('uncaughtException',(request, response, route, error) => {
  console.error(error.stack);
  response.send(error);
});

server.listen(port);
