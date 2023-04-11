const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce.js')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceCtrl.getAll);
router.get('/:id', auth, sauceCtrl.getOne);
router.post('/', auth, multer, sauceCtrl.create);
router.post('/:id/like', auth, sauceCtrl.like);
router.put('/:id', auth, multer, sauceCtrl.modify);
router.delete('/:id', auth, sauceCtrl.delete);

module.exports = router;