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

module.exports.delete = function(req, res) {
    Training.deleteOne({ id: req.params.id })
    .then(() => res.json("Training is deleted"))
    .catch(err => res.status(400).json('Error:' + err));
}