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
    var name=req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    if (username.trim() == "" || password.trim() == "" || name.trim() == "") {
        return res.status(403).send({code: 'missing_username_or_password', message: 'You must provide username and password'});
    }
    
    Player.findOne({username: username}).then(playerFound => {
        if (playerFound) {
            return res.status(401).send({code: 'username_already_taken', message: 'Username already taken'});
        } else {   
            let player = new Player();
            player.name=req.body.name;
            player.username = req.body.username;
            player.password = req.body.password;
            
            player.setPassword(password);    
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
        }
    });
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