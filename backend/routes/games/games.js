var mongoose = require('mongoose');
var router = require('express').Router();
var Game = mongoose.model('game');
var Player = mongoose.model('player');

router.post('/', async (req, res, next) => {

    let token = req.headers['token'];

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
    
    if (req.body.add_to_library) {
        let token = req.headers['token'];
        let currentUser = await Player.current(token);
        currentUser.games.push(game);
        currentUser.save();
    }
    res.send(game);
});

router.get('/', (req, res, next) => {
    let query = req.query['q'];
    if (query && typeof query == 'string') {   
        Game.find({ name: { $regex: query, '$options': 'i' } }).then(games => {
            res.send(games);
        });
    }
});

module.exports = router;
