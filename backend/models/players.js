var mongoose =require('mongoose');
var crypto = require('crypto');

var playerSchema= new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  hash: { type: String },
  salt: {type: String },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'game', required: false }]
},{timestamps:true});

playerSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

playerSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  if(hash == this.hash){
    return true;
  }

  return false;
}

mongoose.model('player', playerSchema);