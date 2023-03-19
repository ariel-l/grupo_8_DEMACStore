const { check, body } = require("express-validator");
const { users } = require("../database");
const bcrypt = require("bcryptjs");
const path = require("path");
const { off } = require("process");

module.exports = [
    
    check("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio").bail(),

    body("username")
    .custom((value, {req}) => {
        const user = users.find(user => user.username === value)
        console.log(user)
        return user && user.id !== req.session.user.id ? false : true
        
    })

    
    .withMessage("Nombre de usuario en uso, elija otro"),

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
    .withMessage("Email ya en uso"),
    
    check("name")
    .notEmpty()
    .withMessage("Por favor indique su nombre"),
    
    check("lastName")
    .notEmpty()
    .withMessage("Por favor indique su apellido"),

    check("tel")
    .notEmpty()
    .withMessage("Por favor indique su número de celular")
    .isLength({min: 10}),

    check("avatar")
    .optional({nullable: true})
    .custom((value, {req}) => {
        const file = req.file;
        const allowedExtensions = [".jpg", ".png", ".jpeg", ".svg"]
        const fileExtension = path.extname(file.originalname);
       
        if(!allowedExtensions.includes(fileExtension)){
            throw new Error("El formato debe ser .jpg , .png , .jpeg , .svg")
        }
        return true
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