const Custas = require('../model/custas');

exports.listAll = async (req, res) => {
    await Custas.find({}, "-__v")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os Custas.',
                error: err
            });
        });
};

exports.create = async (req, res) => {
    const custas = new Custas({
        valor: req.body.valor,
        comprovantePath :req.body.comprovantePath
    });
    await custas.save()
        .then((result) => {
            res.status(201).send({
                message: 'Custas cadastrado com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha cadastrado Custas!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.body.custas_id;
    await Custas.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Custas não encontrado: id " + req.params.custas_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Custas não encontrado: id " + req.params.custas_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.custas_id;
    await Custas.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Custas não encontrado: id " + req.params.custas_id
            });
        }
        res.send({
            message: "Custas removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Custas não encontrado: id " + req.params.custas_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.custas_id;
    await Custas.findOneAndUpdate(
        {
            _id: id
        },
        {
            valor: req.body.valor,
            comprovantePath :req.body.comprovantePath
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Custas não encontrado: id " + req.params.custas_id
            });
        }
        res.send({
            message: "Custas atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Custas não encontrado : id" + req.params.custas_id
            });
        }
        res.status(500).send(err.message);
    });
};  