const Processo = require('../model/processo');

exports.listAll = async (req, res) => {
    await Processo.find({}, "-__v")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os processos.',
                error: err
            });
        });
};

exports.create = async (req, res) => {
    const processo = new Processo({
        idparteContraria: req.body.idparteContraria, //id da coleção clientes
        idcliente: req.body.idcliente, //id da coleção clientes
        idaudiencia: req.body.idaudiencia,//id da coleção clientes
        descricao: req.body.descricao,
        idadvogado: req.body.idadvogado, //id da coleção advogados
        juiz: req.body.juiz,
        sentenca: req.body.sentenca,
        adicional: req.body.adicional
    });
    await processo.save()
        .then((result) => {
            res.status(201).send({
                message: 'Processo cadastrado com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha : processo não cadastrado!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.params.processo_id;
    await Processo.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Processo não encontrado: id " + req.params.processo_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Processo não encontrado: id " + req.params.processo_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.processo_id;
    await Processo.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Processo não encontrado: id " + req.params.processo_id
            });
        }
        res.send({
            message: "Processo removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Processo não encontrado: id " + req.params.processo_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.processo_id;
    await Processo.findOneAndUpdate(
        {
            _id: id
        },
        {
            idparteContraria: req.body.idparteContraria, //id da coleção clientes
            idcliente: req.body.idcliente, //id da coleção clientes
            idaudiencia: req.body.idaudiencia,//id da coleção clientes
            descricao: req.body.descricao,
            idadvogado: req.body.idadvogado, //id da coleção advogados
            juiz: req.body.juiz,
            sentenca: req.body.sentenca,
            adicional: req.body.adicional
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Processo não encontrado: id " + req.params.processo_id
            });
        }
        res.send({
            message: "Processo atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Processo não encontrado : id " + req.params.processo_id
            });
        }
        res.status(500).send(err.message);
    });
};  