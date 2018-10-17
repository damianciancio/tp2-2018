var router=require('express').Router();

router.use('/api/players', require('./players'));
router.use('/api/groups', require('./groups'));

module.exports=router;