const {Router} = require("express");
const router = Router();
const {isDate} = require('../helpers/isDate')
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/event')
const { validarCampos } = require("../middlewares/validar-campos");

router.use(validarJWT);

router.get("/",getEventos);

router.post("/",[
    check('title','El nombre es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de termino es obligatoria').custom(isDate),
    validarCampos,
    crearEvento
]  );

router.put("/:id",actualizarEvento);

router.delete("/:id",eliminarEvento);


module.exports = router;
