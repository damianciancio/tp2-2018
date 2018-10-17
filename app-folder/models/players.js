var mongoose =require('mongoose');

var playerSchema= new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'game', required: false }]
},{timestamps:true});

mongoose.model('player', playerSchema);