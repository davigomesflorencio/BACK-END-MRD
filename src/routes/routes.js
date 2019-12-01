const router = require('express').Router();
const ctlAdvogado = require('../controllers/controllerAdvogado');
const ctlCliente = require('../controllers/controllerCliente');
const ctlAudiencia = require('../controllers/controllerAudiencia');
const ctlCustas = require('../controllers/controllerCustas');
const ctlTribunal = require('../controllers/controllerTribunal');
const ctlVara = require('../controllers/controllerVara');
const ctlProcesso = require('../controllers/controllerProcesso');

router.route('/advogado')
    .get(ctlAdvogado.listAll)
    .post(ctlAdvogado.create);

router.route('/advogado/:advogado_id')
    .get(ctlAdvogado.findOne)
    .put(ctlAdvogado.update)
    .delete(ctlAdvogado.delete);

router.route('/cliente')
    .get(ctlCliente.listAll)
    .post(ctlCliente.create);

router.route('/cliente/:cliente_id')
    .get(ctlCliente.findOne)
    .put(ctlCliente.update)
    .delete(ctlCliente.delete);

router.route('/audiencia')
    .get(ctlAudiencia.listAll)
    .post(ctlAudiencia.create);

router.route('/audiencia/:audiencia_id')
    .get(ctlAudiencia.findOne)
    .put(ctlAudiencia.update)
    .delete(ctlAudiencia.delete);

router.route('/custas')
    .get(ctlCustas.listAll)
    .post(ctlCustas.create);

router.route('/custas/:custas_id')
    .get(ctlCustas.findOne)
    .put(ctlCustas.update)
    .delete(ctlCustas.delete)


router.route('/tribunal')
    .get(ctlTribunal.listAll)
    .post(ctlTribunal.create);

router.route('/tribunal/:tribunal_id')
    .get(ctlTribunal.findOne)
    .put(ctlTribunal.update)
    .delete(ctlTribunal.delete);

router.route('/vara')
    .get(ctlVara.listAll)
    .post(ctlVara.create);

router.route('/vara/:vara_id')
    .get(ctlVara.findOne)
    .put(ctlVara.update)
    .delete(ctlVara.delete);

router.route('/processo')
    .get(ctlProcesso.listAll)
    .post(ctlProcesso.create);

    router.route('/processo/:processo_ids')
    .get(ctlProcesso.generatePdf);

router.route('/processo/:processo_id')
    .get(ctlProcesso.findOne)
    .put(ctlProcesso.update)
    .delete(ctlVara.delete);

module.exports = router;