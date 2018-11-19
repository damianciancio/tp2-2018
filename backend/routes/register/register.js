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


router.post("/login", function(req, res, next){
    Player.findOne({username: req.body.username})
    .then(function(user){
        console.log(user);
        passport.authenticate('local', function(err, user, info){
            var token;
            console.log(err);
            if (err) {
                res.status(404).json(err);
                return;
            }
            
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });
}); 



module.exports = router;