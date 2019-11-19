const Vara = require('../model/vara');

exports.listAll = async (req, res) => {
    await Vara.find({}, "-__v")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar as varas.',
                error: err
            });
        });
};

exports.create = async (req, res) => {
    const vara = new Vara({
        numero: req.body.numero,
        idTribunal: req.body.idTribunal
    });
    await vara.save()
        .then((result) => {
            res.status(201).send({
                message: 'Vara cadastrada com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha : Vara não cadastrada!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.body.vara_id;
    await Vara.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Vara não encontrada: id " + req.params.vara_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Vara não encontrada: id " + req.params.vara_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.vara_id;
    await Vara.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Vara não encontrada : id " + req.params.vara_id
            });
        }
        res.send({
            message: "Vara removida com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Vara não encontrada: id " + req.params.vara_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.vara_id;
    await Vara.findOneAndUpdate(
        {
            _id: id
        },
        {
            numero: req.body.numero,
            idTribunal: req.body.idTribunal
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Vara não encontrada: id " + req.params.vara_id
            });
        }
        res.send({
            message: "Vara atualizada com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Vara não encontrada : id " + req.params.vara_id
            });
        }
        res.status(500).send(err.message);
    });
};  