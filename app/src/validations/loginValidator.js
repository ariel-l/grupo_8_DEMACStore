const { check, body } = require("express-validator");
const { users } = require("../database");
const bcrypt = require("bcryptjs");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        const user = users.find(user => user.email === value)

        return user !== undefined;
    })
    .withMessage("Email no registrado"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("password")
    .custom((value, { req }) => {
        const user = users.find(user => user.email === req.body.email);

        return bcrypt.compareSync(value, user.password);
    })
    .withMessage("Contraseña inválida")
]