var router=require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Player = mongoose.model('player');

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'clavesecreta',
    userProperty: 'payload'
});

const addCurrentUser = async function(req, res, next) {
    let token = req.headers['token'];

    if (!token) {
        next();
    }

    try {
        let currentUser = await Player.current(token);
        res.locals.currentUser = currentUser;
        next();
    } catch (error) {
        next(error);
    }
}

router.use('/api/players',  auth,  addCurrentUser, require('./players/players'));
router.use('/api/groups', auth, addCurrentUser, require('./groups/groups'));
router.use('/api/games', auth, addCurrentUser, require('./games/games'));
router.use('/api/plays', auth, addCurrentUser, require('./plays/plays'));
router.use('/api/register', require('./register/register'));


module.exports=router;