const Processo = require('../model/processo');
const cliente = require('../model/cliente');
const audiencia = require('../model/audiencia');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

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

exports.generatePdf = async (req, res) => {
    if(req.body.hasOwnProperty('processes')){
        const processes = req.body.processes;
        const filename = (Date.now()).toString();
        var html = fs.readFileSync(__dirname + '/../utils/template.html', 'utf8');
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm"
        };
        var document = {
            type: 'file',
            template: html,
            context: {
                processes: processes
            },
            path:  filename
        };
        pdf.create(document, options);
        fs.readFile('./output.pdf', function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    }else{
        res.status(500).send({error: "Nenhum processo informado"});
    }
};