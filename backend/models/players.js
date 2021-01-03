var mongoose =require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const SECRET_KEY = "clavesecreta";

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
  return hash == this.hash;
}

playerSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000)
  }, SECRET_KEY); // TODO: setear esta variable como variable de entorno
}

playerSchema.statics.current = async function(token) {
  let data = jwt.decode(token, SECRET_KEY)
  if (data) {
    let user = await this.findById(data._id);
    return user;
  }
  return null;
}


mongoose.model('player', playerSchema);