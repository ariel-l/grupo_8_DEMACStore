const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");
const { upLoadImageProduct } = require('../middlewares/upload');
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const adminInSessionCheck = require('../middlewares/adminInSessionCheck');

/* GET ALL PRODUCTS PAGE */
router
    .get('/', productsControllers.index)


/* GET CART PAGE */
router
    .get('/cart', userInSessionCheck, productsControllers.cart)


/* GET PRODUCT CREATE FORM PAGE */
router
    .get('/create', adminInSessionCheck, productsControllers.create)
/* CREATE ONE PRODUCT */
    .post('/create', upLoadImageProduct.single("image"), productsControllers.store)

/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', productsControllers.productDetail)


/* GET PRODUCT MODIFY FORM */
router
    .get("/edit/:id", adminInSessionCheck, productsControllers.modify)
    .put("/edit/:id", adminInSessionCheck, upLoadImageProduct.single("image"), productsControllers.update)
    .delete('/edit/delete/:id', adminInSessionCheck, productsControllers.destroy);

/* DELETE ONE PRODUCT */
/* EXPORT ROUTER */
module.exports = router;