const { check, body } = require('express-validator')
const { readJSON } = require('../database')
const users = readJSON('users.json')

module.exports = [
    check('username')
    .custom(value => {
        const username = users.find(user => user.username === value)

        return username === undefined
    })
    .withMessage('Nombre de usuario en uso').bail()
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio'),

    check('email')
    .notEmpty()
    .withMessage('El email es obligatorio').bail()
    .isEmail()
    .withMessage('Email inválido'),

    body('email')
    .custom(value => {
        const user = users.find(user => user.email === value)

        return user === undefined
    })
    .withMessage('Email ya registrado'),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 4
    })
    .withMessage('La contraseña debe tener como mínimo 4 caracteres'),

    body('pass2')
    .custom((value, {req}) => value === req.body.password)
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]