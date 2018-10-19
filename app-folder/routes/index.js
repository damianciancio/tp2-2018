var router=require('express').Router();

router.use('/api/players', require('./players/players'));
router.use('/api/groups', require('./groups/groups'));
router.use('/api/games', require('./games/games'));
router.use('/api/plays', require('./plays/plays'));

module.exports=router;