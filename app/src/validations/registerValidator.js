const { check, body } = require('express-validator');
const { User } = require("../database/models");
//const { readJSON } = require('../database')
//const users = readJSON('users.json')

module.exports = [
    check('username')
    .custom(value => {
        return User.findOne({
            where: {
                username: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Nombre de usuario en uso");
        })
        .catch(error => console.log(error))
    }),
    
    check('email')
    .notEmpty()
    .withMessage('El email es obligatorio').bail()
    .isEmail()
    .withMessage('Email inválido'),

    body('email')
    .custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Email ya registrado")
        })
        .catch(error => console.log(error))
    }),

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