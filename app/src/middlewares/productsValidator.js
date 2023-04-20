const { check } = require('express-validator');

module.exports = [
    check('name').notEmpty().withMessage("Nombre del producto Requerido"),
    check('price').notEmpty().withMessage("Precio Requerido")
]