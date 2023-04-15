const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');
const limiter = require('../middleware/limiter');

router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;