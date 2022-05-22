const router = require('express').Router();
const {signIn, signUp} = require('../controllers/userControllers');


router.route('/sigup')
    .post(signUp);

router.route('/sigin')
    .post(signIn);

module.exports = router;