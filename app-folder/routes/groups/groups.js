var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
var Group = mongoose.model('group');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    let idUser = req.params.id;
    Group.find({
        "members": idUser
    })
    .then(groups =>{
        if(!groups){ return res.sendStatus(401); }
        return res.json({'groups': groups})
    })
    .catch(next);
});

module.exports = router;