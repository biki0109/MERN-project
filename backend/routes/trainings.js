const router = require('express').Router();
const trainingController = require('../controllers/trainings.controller');
let Training = require('../models/training.model');

router.route('/').get(trainingController.getAll); 

router.route('/:id').get(trainingController.getOne);

router.route('/add').post(trainingController.post);

router.route('/:id').delete(trainingController.delete);

router.route('/update/:id').put(trainingController.put);

module.exports = router;