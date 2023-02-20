const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");
const { upLoadImageProduct } = require('../middlewares/upload');


/* GET ALL PRODUCTS PAGE */
router
    .get('/', productsControllers.index)


/* GET CART PAGE */
router
    .get('/cart', productsControllers.cart)


/* GET PRODUCT CREATE FORM PAGE */
router
    .get('/create', productsControllers.create)
/* CREATE ONE PRODUCT */
    .post('/create', upLoadImageProduct.single("image"), productsControllers.store)


/* GET PRODUCT MODIFY FORM */
router
    .get('/edit', productsControllers.modify)


/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', productsControllers.productDetail)



/* EXPORT ROUTER */
module.exports = router;