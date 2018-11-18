var router=require('express').Router();


var jwt = require('express-jwt');
var auth = jwt({
    secret: 'clavesecreta',
    userProperty: 'payload'
});

router.use('/api/players',auth, require('./players/players'));
router.use('/api/groups', auth,require('./groups/groups'));
router.use('/api/games', auth,require('./games/games'));
router.use('/api/plays', auth,require('./plays/plays'));
router.use('/api/register', require('./register/register'));

module.exports=router;