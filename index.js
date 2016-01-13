var restify = require('restify');  //package for API routes

//run the server
var port = process.env.PORT || 80; //it's required to have this environmental variable set in on deploy on heroku

var server = restify.createServer({
  name: 'signature-data-backend',
  version: '0.0.1'
});

server.pre(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


// this is just a route for the index of the API
server.get('/', function (req, res, next) {
  var hardcoded = {
    "totalCount": "4003"
  };

  res.send(hardcoded);
  return next();
});


server.listen(port, function () {
  console.log('%s listening at url %s', server.name, server.url);
});
