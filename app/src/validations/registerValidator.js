const { check, body } = require('express-validator');
const { User } = require("../database/models");
const path = require("path");
regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

module.exports = [
    check('username')
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio").bail()
    .isLength({ min: 2})
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
    
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email invalido"),
    body('email')
    .custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) {
                return Promise.reject('El email ya está registrado')
            }
        })
    }),
    
    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 8
    })
    .withMessage('La contraseña debe tener como mínimo 8 caracteres'),

    body("password")
    .custom((value) => {
        return regExPass.test(value)
    })
        .withMessage("la contraseña deberá tener letras mayúsculas, minúsculas, un número y un carácter especial."),

    check("pass2")
    .notEmpty()
    .withMessage("Debe reingresar la contraseña").bail(),

    body('pass2')
    .custom((value, {req}) => value === req.body.password)
    .withMessage('Las contraseñas no coinciden'),

    check("avatar")
        .custom((value, { req }) => {
            const file = req.file;
            if (!file) {
                return true;
            } else {
                const allowedExtensions = [".jpg", ".png", ".jpeg", ".gif"];
                const fileExtension = path.extname(file.originalname);
                if (!allowedExtensions.includes(fileExtension)) {
                    throw new Error("El formato debe ser .jpg, .png, .jpeg o .gif");
                }
                return true;
            }
        }),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]