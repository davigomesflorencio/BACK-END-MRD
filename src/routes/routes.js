const router = require('express').Router();
const ctlAdvogado = require('../controllers/controllerAdvogado');

router.route('/advogado')
    .get(ctlAdvogado.listAll)
    .post(ctlAdvogado.create);

router.route('/advogado/:advogado_id')
    .get(ctlAdvogado.findOne)
    .put(ctlAdvogado.update)
    .delete(ctlAdvogado.delete);

module.exports = router;