var express        = require('express');
var mongoose    = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');

var app            = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/juegosdemesa');
require('./models/players.js');
require('./models/groups.js');
require('./models/matches.js');
require('./models/players.js');
require('./models/games.js');

app.use(require('./routes'));

var router=express.Router();


app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});