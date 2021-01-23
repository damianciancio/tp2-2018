var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
var passport = require('passport');

 /*
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);*/



router.post('/setpasswords', (req, res, next) => {
    Player.find({})
    .then((players) => {
        players.forEach(function(player){
            player.setPassword(player.username);
            player.save()
        });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
    let name=req.body.name;
    let username=req.body.username;
    //let passw =req.body.password;
    console.log(name);
    let player = new Player();
    player.name = name;
    player.username = username;

    player.setPassword(username);    
    player.save();
    req.login(player, function(err) {
        if (err) {
            console.log(err);
        }
        var token = player.generateJwt();
        res.send({
            user: player,
            token: token   
        });    
    })
});

router.post("/login", function(req, res, next){
    Player.findOne({username: req.body.username})
    .then(function(user){
        passport.authenticate('local', function(err, user, info){
            var token;
            if (err) {
                res.status(404).json(err);
                return;
            }
            
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    user: user,
                    token: token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });
}); 


module.exports = router;