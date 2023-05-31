let { check, body } = require('express-validator');
const { Product, Subcategory, Category } = require("../database/models");
const path = require("path");

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Por favor ingrese el nombre del producto").bail()
    .isLength({ min: 5 , max: 40})
    .withMessage("Por favor ingrese más de 5 caracteres, y menos de 40"),

    check('discount')
    .notEmpty()
    .withMessage('Por favor ingrese un descuento').bail()
    .isInt({ min: 1, max: 75 })
    .withMessage("Solo puedes ingresar un descuento máximo del 75%").bail(),
    
    body('discount')
    .custom((discount) => {
        if (discount === 100) {
            throw new Error('El descuento no puede ser del 100%');
        }
        return true;
    }),

    check('price')
    .notEmpty()
    .withMessage('Por favor ingrese un precio').bail()
    .isFloat({ min: 100 })
    .withMessage('Por favor ingrese un precio mayor a 100 pesos')
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    body('price')
    .custom((price) => {
        if (price === 0) {
            throw new Error('El precio no puede ser de 0 pesos');
        }
        return true;
    }),

    check("image")
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

    check("category")
    .notEmpty()
    .withMessage("Por favor seleccione una categoría"),

    check('subCategory')
    .notEmpty()
    .withMessage('Por favor seleccione una subcategoría'),

    check('brand')
    .notEmpty()
    .withMessage('Por favor seleccione una marca'),

    check('description')
    .isLength({ min: 20 , max: 450})
    .withMessage("Por favor ingrese como máximo 450 caracteres, y como minimo 20"),
]
