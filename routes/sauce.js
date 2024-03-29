const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAll);
router.post('/', auth, multer, sauceCtrl.create);
router.get('/:id', auth, sauceCtrl.getOne);
router.put('/:id', auth, multer, sauceCtrl.modify);
router.delete('/:id', auth, sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;