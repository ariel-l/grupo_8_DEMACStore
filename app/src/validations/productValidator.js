let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Por favor ingrese el nombre del producto")
    .isLength({ min: 3 , max: 40})
    .withMessage("Por favor ingrese más de 3 caracteres, y menos de 40"),

    check('discount')
    .isInt({ min: 0, max: 75 })
    .withMessage("Solo puedes ingresar un descuento máximo del 75%")
    .custom((discount) => {
        if (discount == 100) {
            throw new Error('El descuento no puede ser del 100%');
        }
        return true;
    }),

    check('price')
    .notEmpty()
    .withMessage('Por favor ingrese un precio')
    .isFloat({ min: 1 })
    .withMessage('Por favor ingrese un precio mayor a $1')
    .isNumeric()
    .withMessage("Solo puedes ingresar números")
    /*.custom((price) => {
        if (price === 0) {
            throw new Error('El precio no puede ser de 0 pesos');
        }
        return true;
    })*/
    ,

    //la imagen accepta pdf, todavía no funciona la restricción
    check("image")
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
    .isLength({ min: 3 , max: 40})
    .withMessage("Por favor ingrese como máximo 450 caracteres"),
]
