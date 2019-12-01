const bcrypt = require('bcrypt');
const Advogado = require("../model/advogado");

exports.listAll = async (req, res) => {
    await Advogado.find({}, "-__v -senha")
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: 'Falha ao carregar os advogados.',
                error: err
            });
        });
}

exports.create = async (req, res) => {
    if (await Advogado.findOne({ usuario: req.body.usuario })) {
        res.status(500).send({
            error: 'Nome de usuario já utilizado!'
        });
    } else {
        const saltRounds = 10;
        
        const advogado = new Advogado({
            nome: req.body.nome,
            endereco: {
                rua: req.body.endereco.rua,
                num: req.body.endereco.num,
                bairro: req.body.endereco.bairro,
                cidade: req.body.endereco.cidade
            },
            email: req.body.email,
            usuario: req.body.usuario,
            senha: await bcrypt.hashSync(req.body.senha,saltRounds),
            oab: req.body.oab,
            cpf: req.body.cpf
        });
        await advogado.save()
            .then((result) => {
                res.status(201).send({
                    message: 'Advogado cadastrado com sucesso!'
                });
            }).catch((err) => {
                res.status(500).send({
                    error: 'Falha cadastrado advogado!'
                });
            });
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.advogado_id;
    await Advogado.findById(
        {
            _id: id
        }, "-__v -senha"
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Advogado não encontrado: id " + req.params.advogado_id
            });
        }
        res.send({ result });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "advogado não encontrado: id " + req.params.advogado_id
            });
        }
        res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.advogado_id;
    await Advogado.deleteOne(
        {
            _id: id
        }
    ).then((result) => {
        if (!result) {
            res.status(404).send({
                error: "Advogado não encontrado: id " + req.params.advogado_id
            });
        }
        res.send({
            message: "Advogado removido com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "advogado não encontrado: id " + req.params.advogado_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.update = async (req, res) => {
    const id = req.params.advogado_id;
    await Advogado.findOneAndUpdate(
        {
            _id: id
        },
        {
            nome: req.body.nome,
            endereco: {
                rua: req.body.endereco.rua,
                num: req.body.endereco.num,
                bairro: req.body.endereco.bairro,
                cidade: req.body.endereco.cidade
            },
            email: req.body.email,
            usuario: req.body.usuario,
            senha: req.body.senha,
            oab: req.body.oab,
            cpf: req.body.cpf
        },
        { new: true }
    ).then((result) => {
        if (!result) {
            return res.status(404).send({
                error: "Advogado não encontrado: id " + req.params.advogado_id
            });
        }
        res.send({
            message: "Advogado atualizado com sucesso",
            res: result
        });
    }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Advogado não encontrado : id" + req.params.advogado_id
            });
        }
        res.status(500).send(err.message);
    });
};

exports.authenticate = async (req,res)=>{
    const advogado = await Advogado.findOne({ usuario: req.body.usuario });
    if (advogado && bcrypt.compareSync(req.body.senha, advogado.senha)) {
        res.send({
            message: "Advogado autenticado com sucesso"
        });
    }else{
        res.send({
            message: "Falha autenticação"
        });
    }  
}