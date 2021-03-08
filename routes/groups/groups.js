var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Group = mongoose.model('group');
var Player = mongoose.model('player');


var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    let query = req.query['q'];
    let findObj = {};
    if (query && typeof query == 'string') {   
        findObj = { name: { $regex: query, '$options': 'i' } }
    }

    Group.find(findObj)
    .then(groups =>{
        if(!groups){ return res.sendStatus(401); }
        return res.json({'groups': groups})
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Group.findById(id)
    .populate('members.player')
    .then(group =>{
        if(!group){ return res.sendStatus(404); }
        return res.json({'group': group})
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {
    console.log(req.body.name);
    
    let name=req.body.name;

    let currentUser = res.locals.currentUser
    let admin = req.body.member_id;
    if (!admin) {
        admin = currentUser._id;
    }

    let groupObj = {
        "name": name,
        "members": [
            {
                "player": admin,
                "is_admin": true,
                "status": "accepted"
            }
        ]
    };

    let group = new Group(groupObj);
    group.save().catch(function(err){
        console.log(err);
    });
    res.send(group);    
});

router.put('/',(req, res, next) => {
    let name = req.body.name;
    let _id = req.body._id;
    Group.findById(_id).then((group) => {
        group.name = name;
        group.save();
        res.send(group);
    });

})


router.get('/:id/members', (req, res, next) => {
    let status = req.query.status;

    let id = req.params.id;
    Group.findById(id)
    .populate('members.player')
    .then(group =>{
        if(!group){ 
            return res.sendStatus(404); 
        }
        let members = group.members;
        if(status) {
            members = group.members.filter(member => {
                if(member.status == status) return true;else return false; 
            })
        }
        return res.json({'data': members});
        
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Group.findById(id)
    .populate('players')
    .then(group =>{
        if(!group){ return res.sendStatus(401); }
        return res.json({'group': group})
    })
    .catch(next);
});

router.post('/:id/members', (req, res, next) => {
    var groupId = req.params.id;

    let initial_status = "pending";
    if (req.body.initial_status) {
        initial_status = req.body.initial_status;
    }

    Group.findById(groupId)
    .populate('members.player')
    .then(group => {
        
        let foundAdmin = group.members.some(member => {
            return String(member.player._id) == String(res.locals.currentUser._id) && member.is_admin
        });

        if (!foundAdmin && initial_status != 'pending') {
            return res.sendStatus(401);
        }

        let userAlreadyOnGroup = group.members.some(member => {
            return member.player._id == req.body.member_id;
        });

        if (userAlreadyOnGroup) {
            res.sendStatus(409);
        }

        Player.findById(req.body.member_id)
        .then(player => {
            var newMember = {
                "player": player,
                "is_admin": false,
                "status": initial_status
            };
            group.members.push(newMember);
            group.save();
            res.send(true);    
        });
    })
    .catch(next);

});


router.put('/:id/members/:idmember', (req, res, next) => {
    var groupId = req.params.id;
    var idmember = req.params.idmember;
    var newStatus = req.body.newStatus;
    Group.findById(groupId)
    .then(group => {
        var filteredMembers = group.members.filter((member)=>{
            if(member._id.equals(idmember)) {
                return true;
            }
        });

        if(filteredMembers.length == 1){
            member = filteredMembers[0];
            member.status = newStatus;
            group.save();
        }
    }).catch(next);

    res.send(true);    
});


module.exports = router;