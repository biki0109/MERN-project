let Training = require('../models/training.model');

module.exports.getAll = function(req, res){
    Training.find({})
    .then(trainings => res.json(trainings))
    .catch(err => res.status(400).json('Error:' + err));
}

module.exports.getOne = function(req, res) {
    Training.findOne({ id: req.params.id })
    .then(training => res.json(training))
    .catch(err => res.status(400).json('Error:' + err));
}

module.exports.post = function (req, res) {
    const id = req.body.id
    const ptID = req.body.ptID;
    const clientID = req.body.clientID;
    const clientName = req.body.clientName;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newTraining = new Training({
        id,
        ptID,
        clientID,
        clientName,
        description,
        date,
    });

    newTraining.save()
    .then(() => res.json('New training added'))
    .catch(err => res.status(400).json('Error:' + err));
}


module.exports.put = function(req, res) {
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
}

module.exports.delete = function(req, res) {
    Training.deleteOne({ id: req.params.id })
    .then(() => res.json("Training is deleted"))
    .catch(err => res.status(400).json('Error:' + err));
}

