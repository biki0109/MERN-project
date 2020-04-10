const router = require('express').Router();
const trainingController = require('../controllers/trainings.controller');
let Training = require('../models/training.model');

router.route('/').get((req, res) => {
    Training.find({})
    .then(trainings => res.json(trainings))
    .catch(err => res.status(400).json('Error:' + err));
})



router.route('/:id').get((req, res) => {
    Training.findOne({ id: req.params.id })
    .then(training => res.json(training))
    .catch(err => res.status(400).json('Error:' + err));
})

router.route('/add',trainingController.post);

router.route('/:id',trainingController.delete)

router.route('/update/:id').post((req, res) => {
    Training.findOne({ id: req.params.id })
    .then(training => {
        training.id = req.body.id;
        training.ptID = req.body.ptID;
        training.clientID = req.body.clientID; 
        training.clientName = req.body.clientName;
        training.description = req.body.description;
        training.date = Date.parse(req.body.date);

        training.save()
        .then(() => res.json("Training is updated!"))
        .catch(err => res.status(400).json('Error:' + err));

    })
    .catch(err => res.status(400).json('Error:' + err));
})

module.exports = router;