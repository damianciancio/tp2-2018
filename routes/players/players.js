var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
var Group = mongoose.model('group');
var Play = mongoose.model('play');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {

    let query = req.query['q'];
    let queryObject = {};
    if (query && typeof query == 'string') {
        queryObject = { username: { $regex: query, '$options': 'i' } };   
    }


    Player.find(queryObject)
    .then(players =>{
        if(!players){ return res.sendStatus(401); }
        return res.json({'players': players})
    })
    .catch(next);
});

router.get('/:id/groups', (req, res, next) => {
    let idUser = req.params.id;
    let admin = req.query.admin;
    let status = req.query.status;

    let queryObject = { "members.player": idUser };
    let filter = null;
    if (admin || status) {
        filter = (group) => {
            let member = group.members.find(member => {
                if(member.player._id == idUser) {
                    return true;
                }
            });

            if((admin && member.is_admin) || (status && member.status == status)) {
                return true;
            }
            return false;
        }
    }
    Group.find(queryObject)
    .populate('player')
    .then(groups =>{
        if(!groups){ return res.sendStatus(401); }
        if(filter) {
            groups = groups.filter(filter);
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
    .populate('games')
    .then((player) => {

        let duplicated = player.games.find(aGame => aGame._id == game._id);
        if (duplicated) {
            return res.status(403).send({code: 'user_already_has_the_game', message: 'The user already has this game in his library'})
        }

        player.games.push(game);
        player.save();
        return res.send(player);
    })
    .catch(next);
});

router.get('/current-user', function(req, res, next) {
    return res.send({'user': res.locals.currentUser});
})


module.exports = router;