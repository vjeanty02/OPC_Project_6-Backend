const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce.js')

router.get('/', sauceCtrl.getAll);
router.get('/:id', sauceCtrl.getOne);
router.post('/', sauceCtrl.create);
router.put('/:id', sauceCtrl.modify);
router.delete('/:id', sauceCtrl.delete);

module.exports = router;