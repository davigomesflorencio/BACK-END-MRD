const Audiencia = require('../model/audiencia');

exports.listAll = async (req, res) => {
    await Audiencia.find({}, "-__v")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os Audiencias.',
                error: err
            });
        });
};

exports.create = async (req, res) => {
    const audiencia = new Audiencia({
        nome: req.body.data,
        recomendacao :req.body.recomendacao
    });
    await audiencia.save()
        .then((result) => {
            res.status(201).send({
                message: 'Audiencia cadastrado com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha cadastrado Audiencia!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.params.audiencia_id;
    await Audiencia.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Audiencia não encontrado: id " + req.params.audiencia_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Audiencia não encontrado: id " + req.params.audiencia_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.audiencia_id;
    await Audiencia.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Audiencia não encontrado: id " + req.params.audiencia_id
            });
        }
        res.send({
            message: "Audiencia removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Audiencia não encontrado: id " + req.params.audiencia_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.audiencia_id;
    await Audiencia.findOneAndUpdate(
        {
            _id: id
        },
        {
            nome: req.body.data,
            recomendacao :req.body.recomendacao
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Audiencia não encontrado: id " + req.params.audiencia_id
            });
        }
        res.send({
            message: "Audiencia atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Audiencia não encontrado : id" + req.params.audiencia_id
            });
        }
        res.status(500).send(err.message);
    });
};  