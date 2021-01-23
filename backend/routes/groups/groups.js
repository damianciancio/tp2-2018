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
    let token = req.headers['token'];

    let currentUser = await Player.current(token);
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
        let members_ids = group.members.map(memberElement => {
            return memberElement.player;
        });
        console.log("members_ids: ",members_ids);
        Player.find({'_id': { $in: members_ids}}).then(players =>
            {   
                console.log(players);
                let members_array = [];
                group.members.forEach(member => {
                    //var playerFound = players.filter(player => {
                    //    return player._id === member._id; 
                    //});
                    players.forEach(player => {
                        if(player._id.equals(member.player)){

                            member.player = player;
                        }
                    });
                });
                members_array = group.members;
                if(status) {
                    members_array = group.members.filter(member => {
                        return member.status == status;
                    });
                }
                
                return res.json({'data': group});
            }
        );
        
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
    Group.findById(groupId)
    .then(group => {
        Player.findById(req.body.member_id)
        .then(player => {
            var newMember = {
                "player": player,
                "is_admin": false,
                "status": "pending"
            };
            group.members.push(newMember);
            group.save();
        });
    })
    .catch(next);

    res.send(true);    
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