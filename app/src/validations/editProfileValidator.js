const { User } = require("../database/models");
const { check, body } = require("express-validator");
//const { users } = require("../database");
const path = require("path");

module.exports = [
    
    check("username")
    /*.custom(value => {
        return User.findOne({
            where: {
                username: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Nombre de usuario en uso");
        })
        .catch(error => console.log(error))
    })*/
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio").bail(),
    /*.custom((value, {req}) => {
        const user = users.find(user => user.username === value)
        return !(user && user.id !== req.session.user.id)
    })
    .withMessage("Nombre de usuario en uso, elija otro"),*/

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),
    
    body("email")
    /*.custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Email ya en uso")
        })
        .catch(error => console.log(error))
    }),*/
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),
    
    check("name")
    .notEmpty()
    .withMessage("Por favor indique su nombre"),
    
    check("lastName")
    .notEmpty()
    .withMessage("Por favor indique su apellido"),

    check("phone")
    .notEmpty()
    .withMessage("Por favor indique su número de celular")
    .isLength({min: 10}),

    check("avatar")
    .custom((value, {req}) => {
        const file = req.file;
        if(!file) {
            return true
        } else {
            const allowedExtensions = [".jpg", ".png", ".jpeg", ".svg"]
            const fileExtension = path.extname(file.originalname);
            if(!allowedExtensions.includes(fileExtension)){
                throw new Error("El formato debe ser .jpg , .png , .jpeg , .svg")
            }
            return true
        }
    }),

    check("address")
    .notEmpty()
    .withMessage("Por favor indique su dirección "),

    check("postal_code")
    .notEmpty()
    .withMessage("Por favor indique su código postal"),

    check("province")
    .notEmpty()
    .withMessage("Por favor indique su provincia"),

    check("city")
    .notEmpty()
    .withMessage("Por favor indique su ciudad"),

]