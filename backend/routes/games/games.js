var mongoose = require('mongoose');
var router = require('express').Router();
var Game = mongoose.model('game');

router.post('/', (req, res, next) => {
    

    let gameObj = {
        name: req.body.name,
        min_players: req.body.min_players,
        max_players: req.body.max_players,
        duration: req.body.duration,
        type: req.body.type
    
    };
    let game = new Game(gameObj);
    let uid = req.body.owner;
    game.save();
    res.send(game);    
});

module.exports = router;
