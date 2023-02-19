const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsControllers");

/* GET CART PAGE */
router
    .get('/cart', controller.cart);


/* GET PRODUCT CREATE FORM */
router
    .get('/create', controller.create);


/* GET MODIFY PRODUCT FORM */
router
    .get('/edit', controller.modify);


/* GET PRODUCT DETAIL PAGE */
router
    .get('/detail/:id', controller.productDetail)

/* EXPORT ROUTER */
module.exports = router;