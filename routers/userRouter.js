const router = require('express').Router();


router.route('/sigup')
    .post(signUp);

router.route('/sigin')
    .post(signIn);

module.exports = router;