const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");


/* GET ALL PRODUCTS */
router
    .get('/', productsControllers.index)


/* GET CART PAGE */
router
    .get('/cart', productsControllers.cart)


/* GET PRODUCT CREATE FORM */
router
    .get('/create', productsControllers.create);


/* GET MODIFY PRODUCT FORM */
router
    .get('/edit', productsControllers.modify);


/* GET PRODUCT DETAIL PAGE */
router
    .get('/detail', productsControllers.productDetail);



/* EXPORT ROUTER */
module.exports = router;