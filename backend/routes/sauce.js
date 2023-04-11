const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce.js')
const auth = require('../middleware/auth');

router.get('/', auth, sauceCtrl.getAll);
router.get('/:id', auth, sauceCtrl.getOne);
router.post('/', auth, sauceCtrl.create);
router.post('/:id/like', auth, sauceCtrl.like);
router.put('/:id', auth, sauceCtrl.modify);
router.delete('/:id', auth, sauceCtrl.delete);

module.exports = router;