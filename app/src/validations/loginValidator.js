const { check, body } = require("express-validator");
const { User } = require("../database/models");
const bcrypt = require("bcryptjs");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("password")
    .custom((value, { req }) => {
        return User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.dataValues.password)) {
                return Promise.reject();
            }
        })
        .catch(() => Promise.reject("Email o contraseña incorrecto"))
    }),
]