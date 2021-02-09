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
  "http://localhost:4200",
  "http://localhost:1024"
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
  
  
  const port = process.env.PORT || 3000;
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  
  let url = "";
  if (process.env.NODE_ENV === 'production') {
    url = "mongodb://boardgamesapi:ed1Bcr8C4yuYt4lC@cluster0-shard-00-00.tztxy.mongodb.net:27017,cluster0-shard-00-01.tztxy.mongodb.net:27017,cluster0-shard-00-02.tztxy.mongodb.net:27017/juegosdemesa?ssl=true&replicaSet=atlas-12mgs3-shard-0&authSource=admin&retryWrites=true&w=majority";
  } else {
    url = 'mongodb://localhost/juegosdemesa';
  }

  mongoose.connect(url);
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

var router = express.Router();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));


  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});