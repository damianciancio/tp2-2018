var mongoose =require('mongoose');

var gameSchema = new mongoose.Schema({
    name: {type: String, required: false},
    date: {type: Date, required: true},
    duration: {type: Number, required: true},
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'player'},
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'group' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'game' },
},{timestamps:true});

mongoose.model('play', gameSchema);