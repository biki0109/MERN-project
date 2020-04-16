const router = require('express').Router();
const packController = require('../controllers/packs.controller');
let Pack = require('../models/pack.model');

router.route('/').get(packController.getAll); 

router.route('/:id').get(packController.getOne);

router.route('/add').post(packController.post);

router.route('/:id').delete(packController.delete);

router.route('/update/:id').put(packController.put);

module.exports = router;