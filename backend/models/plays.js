var mongoose =require('mongoose');

var gameSchema = new mongoose.Schema({
    name: {type: String, required: false},
    date: {type: Date, required: true},
    duration: {type: Number, required: true},
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'player'},
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'group' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'game' },
    comments: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'player', required: true},
        comment: { type: String, required: true },
        datetime: { type: Date, required: true }
    }]
},{timestamps:true});

mongoose.model('play', gameSchema);