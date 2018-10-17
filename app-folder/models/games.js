var mongoose =require('mongoose');

var gameSchema= new mongoose.Schema({
    name: {type: String, required: true},
    min_players: {type: Number, required: true},
    max_players: {type: Number, required: true},
    duration: {type: Number, required: true},
    type: {type: String, required: false}
},{timestamps:true});

mongoose.model('game', gameSchema);