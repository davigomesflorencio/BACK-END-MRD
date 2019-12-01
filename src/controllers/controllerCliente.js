const Cliente = require('../model/cliente');

exports.listAll = async (req, res) => {
    await Cliente.find({}, "-__v")
        .then((result) => {
            console.log(result);
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os clientes.',
                error: e
            });
        });
};

exports.create = async (req, res) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        endereco: {
            rua: req.body.endereco.rua,
            numero: req.body.endereco.numero,
            bairro: req.body.endereco.bairro,
            cidade: req.body.endereco.cidade
        },
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha,
        cpf: req.body.cpf,
        cnpj: req.body.cnpj,
    });
    await cliente.save()
        .then((result) => {
            res.status(201).send({
                message: 'Cliente cadastrado com sucesso!'
            });
        }).catch((err) => {
            res.status(500).send({
                error: 'Falha cadastrado cliente!' + err.message
            });
        });
};

exports.findOne = async (req, res) => {
    const id = req.params.cliente_id;
    await Cliente.findById(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Cliente não encontrado: id " + req.params.cliente_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Cliente não encontrado: id " + req.params.cliente_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.cliente_id;
    await Cliente.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Cliente não encontrado: id " + req.params.cliente_id
            });
        }
        res.send({
            message: "Cliente removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Cliente não encontrado: id " + req.params.cliente_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.cliente_id;
    await Cliente.findOneAndUpdate(
        {
            _id: id
        },
        {
            nome: req.body.nome,
            endereco: {
                rua: req.body.endereco.rua,
                numero: req.body.endereco.numero,
                bairro: req.body.endereco.bairro,
                cidade: req.body.endereco.cidade
            },
            email: req.body.email,
            usuario: req.body.usuario,
            senha: req.body.senha,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Cliente não encontrado: id " + req.params.cliente_id
            });
        }
        res.send({
            message: "Cliente atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Cliente não encontrado : id" + req.params.cliente_id
            });
        }
        res.status(500).send(err.message);
    });
};  

