var mongoose = require('mongoose');
var router = require('express').Router();
var Play = mongoose.model('play');
var Player = mongoose.model('player');

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
    play.save()
    .catch(next);
    res.send(play);    
});


router.get('/', (req, res, next) => {
    let findObject = {};
    if (req.params.group_id) {
        findObject = {group: mongoose.Types.ObjectId(group_id)};
    }
    Play.find(findObject)
    .populate('game')
    .populate('players')
    .then(plays => {
        res.send(plays);
    }).catch(next);
      
});



router.get('/my-plays', async (req, res, next) => {

    let token = req.headers['token'];
    let currentUser = await Player.current(token);

    Play.find({players: mongoose.Types.ObjectId(currentUser._id)})
    .populate('game')
    .populate('players')
    .then(plays => {
        res.send(plays);
    }).catch(next);
    ;  
});

module.exports = router;
