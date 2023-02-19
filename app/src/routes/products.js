const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsControllers");
const { upLoadImageProduct } = require('../middlewares/upload');

/* GET CART PAGE */
router
    .get('/cart', controller.cart)


/* GET PRODUCT CREATE FORM */
router
    .get('/create', controller.create)
    .post('/productCreate', upLoadImageProduct.single("image"), controller.store)

/* GET MODIFY PRODUCT FORM */
router
    .get('/edit', controller.modify)


/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', controller.productDetail)

/* EXPORT ROUTER */
module.exports = router;