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


router.post('/:id/comment', async (req, res, next) => {
    
    let token = req.headers['token'];
    let currentUser = await Player.current(token);
    let user_id = currentUser._id;

    Play.findById(req.params.id)
    .populate('comments')
    .then(play => {
        if (!play.comments) {
            play.comments = [];
        }
        play.comments.push({
            user: user_id,
            comment: req.body.comment,
            datetime: Date.now()
        })
        play.save()
        res.send(play);    
    })
    .catch(next);
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

router.get('/:id', (req, res, next) => {

    Play.findById(req.params.id)
    .populate('game')
    .populate('players')
    .populate('comments')
    .then(play => {
        res.send(play);
    }).catch(next);
      
});

module.exports = router;
