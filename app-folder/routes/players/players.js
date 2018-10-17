var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
var Group = mongoose.model('group');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    Player.find({})
    .then(players =>{
        if(!players){ return res.sendStatus(401); }
        return res.json({'players': players})
    })
    .catch(next);
});

router.get('/:id/groups', (req, res, next) => {
    let idUser = req.params.id;
    let admin = req.query.admin;

    let queryObject = { "members": idUser };

    if(admin){
        queryObject = { "admins": idUser };
    }

    Group.find(queryObject)
    .then(groups =>{
        if(!groups){ return res.sendStatus(401); }
        return res.json({'groups': groups})
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Player.findById(id)
    .populate('games')
    .then(player =>{
        if(!player){ return res.sendStatus(401); }
        return res.json({'player': player})
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
    let name=req.body.name;
    let username=req.body.username;

    console.log(req);

    let playerObj = {
        "name": name,
        "username": username,
    };
    let player = new Player(playerObj);
    player.save();
    res.send(player);    
});

module.exports = router;