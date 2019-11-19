const Tribunal = require('../model/tribunal');

exports.listAll = async (req, res) => {
    await Tribunal.find({}, "-__v")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os tribunais.',
                error: err
            });
        });
};

exports.create = async (req, res) => {
    const tribunal = new Tribunal({
        nome:req.body.nome,
        endereco: {
            rua: req.body.endereco.rua,
            numero: req.body.endereco.numero,
            bairro: req.body.endereco.bairro,
            cidade: req.body.endereco.cidade
        }
    });
    await tribunal.save()
        .then((result) => {
            res.status(201).send({
                message: 'Tribunal cadastrado com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha cadastrado Tribunal!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.params.tribunal_id;
    await Tribunal.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Tribunal não encontrado: id " + req.params.tribunal_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Tribunal não encontrado: id " + req.params.tribunal_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.tribunal_id;
    await Tribunal.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Tribunal não encontrado: id " + req.params.tribunal_id
            });
        }
        res.send({
            message: "Tribunal removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Tribunal não encontrado: id " + req.params.tribunal_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.tribunal_id;
    await Tribunal.findOneAndUpdate(
        {
            _id: id
        },
        {
            nome:req.body.nome,
            endereco: {
                rua: req.body.endereco.rua,
                numero: req.body.endereco.numero,
                bairro: req.body.endereco.bairro,
                cidade: req.body.endereco.cidade
            }
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Tribunal não encontrado: id " + req.params.tribunal_id
            });
        }
        res.send({
            message: "Tribunal atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Tribunal não encontrado : id" + req.params.tribunal_id
            });
        }
        res.status(500).send(err.message);
    });
};  