var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
var Group = mongoose.model('group');
var Play = mongoose.model('play');

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

    let queryObject = { "members.player": idUser };

    Group.find(queryObject)
    .populate('player')
    .then(groups =>{
        if(!groups){ return res.sendStatus(401); }
        if(admin) {
            groups = groups.filter((group) => {
                let member = group.members.find(member => {
                    if(member.player._id == idUser) {
                        return true;
                    }
                });

                if(member.is_admin) {
                    return true;
                }
                return false;
            });
        }
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



router.get('/:id/plays', (req, res, next) => {
    let id = req.params.id;
    Play.find({'players': ObjectId(id)})
    .populate('game')
    .then(plays =>{
        if(!plays){ return res.sendStatus(401); }
        return res.json({'plays': plays})
    })
    .catch(next);
});

router.get('/:id/games', (req, res, next) => {
    let id = req.params.id;
    Player.findById(id)
    .populate('games')
    .then(player =>{
        if(!player){ return res.sendStatus(404); }
        return res.json({'games': player.games})
    })
    .catch(next);
});
router.post('/:id/games', (req, res, next) => {
    let id = req.params.id;
    let game = req.body.game;
    Player.findById(id)
    .then((player) => {
        player.games.push(game);
        player.save();
    })
    .catch(next);
});


module.exports = router;