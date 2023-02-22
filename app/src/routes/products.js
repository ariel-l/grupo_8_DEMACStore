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

/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', productsControllers.productDetail)


/* GET PRODUCT MODIFY FORM */
router
    .get("/edit/:id", productsControllers.modify)
    .put("/edit/:id", upLoadImageProduct.single("image"), productsControllers.update)
    .delete('/edit/delete/:id', productsControllers.destroy);

/* DELETE ONE PRODUCT */
/* EXPORT ROUTER */
module.exports = router;