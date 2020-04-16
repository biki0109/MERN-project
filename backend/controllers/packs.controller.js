let Pack = require('../models/pack.model');

module.exports.getAll = function(req, res){
    Pack.find({})
    .then(packs => res.json(packs))
    .catch(err => res.status(400).json('Error:' + err));
}

module.exports.getOne = function(req, res) {
    const idd = req.params.id;
    Pack.findOne({ $or: [{"_id": idd}, {"num": idd}] })
    .then(pack => res.json(pack))
    .catch(err => res.status(400).json('Error:' + err));
}

module.exports.post = function (req, res) {
    const id = req.body.id
    const name = req.body.name;
    const content = req.body.content;
    const duration = req.body.duration;
    const price = req.body.price;
    const created_at = Date.parse(req.body.date);

    const newPack = new Pack({
        id,
        name,
        content,
        duration,
        price,
        created_at,
    });

    newPack.save()
    .then(() => res.json('New pack added'))
    .catch(err => res.status(400).json('Error:' + err));
}


module.exports.put = function(req, res) {
    Pack.findOne({ $or: [{_id: req.params.id}, {"num": req.params.id}] })
    .then(pack => {
        pack.id = req.body.id;
        pack.name = req.body.name;
        pack.content = req.body.content; 
        pack.duration = req.body.duration;
        pack.price = req.body.price;
        pack.created_at = Date.parse(req.body.date);
        pack.save()
        .then(() => res.json("Pack is updated!"))
        .catch(err => res.status(400).json('Error:' + err));

    })
    .catch(err => res.status(400).json('Error:' + err));
}

module.exports.delete = function(req, res) {
    Pack.deleteOne({ $or: [{"_id": req.params.id}, {"id": req.params.id}] })
    .then(() => res.json("Pack is deleted"))
    .catch(err => res.status(400).json('Error:' + err));
}

