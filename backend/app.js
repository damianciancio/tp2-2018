var express        = require('express');
var mongoose    = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');
var passport = require('passport');
var app            = express();
var originsWitheList = [
  "*"
]

var corsOptions = {
  origin: 
    function(origin, callback){
      if(typeof origin != 'undefined'){
        console.log(origin);
      }
      var isWitheListed = originsWitheList.indexOf(origin) !== -1;
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

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

var router=express.Router();


app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});