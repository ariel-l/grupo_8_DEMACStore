const { User } = require("../database/models");
const { check, body } = require("express-validator");
const path = require("path");

module.exports = [
    
    check("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio").bail()
    .custom(async (value, { req }) => {
        const user = await User.findOne({
            where: {
                username: value
            }
        });
        if (user && user.id !== req.session.user.id) {
            throw new Error("Nombre de usuario en uso, elija otro");
        }
        return true;
    }),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido")
    .custom(async (value, { req }) => { // Pasa req como un argumento
        const user = await User.findOne({
            where: {
                email: value
            }
        });
        if (user && user.id !== req.session.user.id) {
            throw new Error("Email ya en uso, elija otro");
        }
        return true;
    }),

    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),
/* 
    check("name")
    .notEmpty()
    .withMessage("Por favor indique su nombre"),

    check("lastName")
    .notEmpty()
    .withMessage("Por favor indique su apellido"),

    check("phone")
    .notEmpty()
    .withMessage("Por favor indique su número de celular")
    .isLength({ min: 10 }),
*/
    check("avatar")
    .custom((value, { req }) => {
        const file = req.file;
        if (!file) {
            return true;
        } else {
            const allowedExtensions = [".jpg", ".png", ".jpeg", ".svg"];
            const fileExtension = path.extname(file.originalname);
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error("El formato debe ser .jpg , .png , .jpeg , .svg");
            }
            return true;
        }
    }),
]