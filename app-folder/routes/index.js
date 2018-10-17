var router=require('express').Router();

router.use('/api/players', require('./players/players'));
router.use('/api/groups', require('./groups/groups'));

module.exports=router;