var mongoose =require('mongoose');

var gameSchema= new mongoose.Schema({
    name: {type: String, required: true},
    members: [{
            player: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
            is_admin: { type: Boolean },
            status: { type: String },
        }
    ]
},{timestamps:true});

mongoose.model('group', gameSchema);