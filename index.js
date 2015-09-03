// index.js 
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var Promise = require('bluebird');
var superagent = require('superagent');
 
var express = require('express');
var app = express();
 
app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting") 
  return new Router([
    {
      // match a request for the key "greeting" 
      route: "greeting.one",
      // respond with a PathValue with the value of "Hello World." 
      get: function() {
        return new Promise(function (resolve) {
          superagent.
            get('http://localhost:5000/api/message').
            end(function (error, response) {
              resolve({path: ['greeting', 'one'], value: response.body.message})
            })
        })
      }
    },
    {
      // match a request for the key "greeting" 
      route: "greeting.two",
      // respond with a PathValue with the value of "Hello World." 
      get: function() {
        return new Promise(function (resolve) {
          superagent.
            get('http://localhost:5001/api/message').
            end(function (error, response) {
              resolve({path: ['greeting', 'two'], value: response.body.message})
            })
        })
      }
    }
  ]);
}));
 
// serve static files from current directory 
app.use(express.static(__dirname + '/'));
 
var server = app.listen(3000);
