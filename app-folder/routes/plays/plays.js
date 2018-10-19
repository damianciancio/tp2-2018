var mongoose = require('mongoose');
var router = require('express').Router();
var Play = mongoose.model('play');

router.post('/', (req, res, next) => {
    

    let playObj = {
        "name": req.body.name,
        "date": Date.now(),
        "duration": req.body.duration,
        "winner": req.body.winner,
        "players": req.body.players,
        "group": req.body.group,
        "game": req.body.game
    };
    let play = new Play(playObj);
    play.save();
    res.send(play);    
});


router.get('/', (req, res, next) => {
    Play.find({})
    .populate('game')
    .then(plays => {
        res.send(plays);
    });  
});

module.exports = router;
