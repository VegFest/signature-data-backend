var restify = require('restify');  //package for API routes
var request = require("request");  //package to do http requests for data from form keep api


var formKeepAPIKey = process.env.FORMKEEPAPIKEY; //set as an environmental variable

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
  var theOutput = {
    "totalCount": "4003" //hardcoded default
  };

  // get totalCount from FormKeep API
  var apiURL = 'https://formkeep.com/api/v1/forms/02515915d774/submissions.json?api_token=' + formKeepAPIKey;

  request({
      url: apiURL,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        theOutput.totalCount = body.meta.pagination.total_count;
        console.log('totalCount: ');
          console.log(theOutput.totalCount) // Print the json response
          res.send(theOutput);
          return next();
      }
  })
});

server.get('/target', function (req, res, next) {
  var theOutput = {
    "totalCount": "666" //hardcoded default
  };

  // get totalCount from FormKeep API
  var apiURL = 'https://formkeep.com/api/v1/forms/08c5a7984b16/submissions.json?api_token=' + formKeepAPIKey;

  request({
      url: apiURL,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        theOutput.totalCount = body.meta.pagination.total_count;
        console.log('totalCount: ');
          console.log(theOutput.totalCount) // Print the json response
          res.send(theOutput);
          return next();
      }
  })
});


server.listen(port, function () {
  console.log('%s listening at url %s', server.name, server.url);
});
