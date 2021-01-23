var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');
var passport = require('passport');
var app            = express();
var originsWitheList = [
  "*",
  "http://localhost:8080",
  "http://localhost:4200"
]
var listEndpoints = require('express-list-endpoints');

var corsOptions = {
  origin: 
    function(origin, callback){
      if(typeof origin != 'undefined'){
        console.log(origin);
      }
      var isWitheListed = originsWitheList.indexOf(origin) !== -1;
      console.log(isWitheListed)
      callback(null, isWitheListed);
    },
    credentials: true
  }
  app.use(cors(corsOptions));
  

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/juegosdemesa');
require('./models/players.js');
require('./models/groups.js');
require('./models/plays.js');
require('./models/games.js');
require('./models/players.js');

require('./config/passport');
app.get("/endpoints", function(req, res, next) {
  res.send(listEndpoints(app));
})
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

var router=express.Router();

// Your own super cool function
var logger = function(req, res, next) {
  next(req, res); // Passing the request to the next handler in the stack.
}

  app.use(logger); // Here you add your logger to the stack.
app.use(router);
app.use(function (err, req, res, next) {
  console.error(err);
  next();
})

app.listen(port, () => {
  console.log('We are live on ' + port);
});