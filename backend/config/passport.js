var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Player = mongoose.model('player');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username'
        }, function(username, password, done){
            Player.findOne({ username: username }, function(err, player){
                if(err){
                    return done(err);
                }

                if(!player){
                    return done(null, false, {
                        message: "Usuario no encontrado"
                    });
                }

                if(!player.validPassword(password)){
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    });
                }
                
                return done(null, player);
            })          
        }
    )
)