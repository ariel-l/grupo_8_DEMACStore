const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");
const { upLoadImageProduct } = require('../middlewares/upload');
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const productsValidator = require('../middlewares/productsValidator');
const adminInSessionCheck = require('../middlewares/adminInSessionCheck');

/* GET ALL PRODUCTS PAGE */
router
    .get('/', productsControllers.index)

/* GET CART PAGE */
router
    .get('/cart', userInSessionCheck, productsControllers.cart)


/* GET PRODUCT CREATE FORM PAGE */
router
    .get('/create', productsControllers.create, productsValidator)//saque temporalmente adminInSessionCheck
/* CREATE ONE PRODUCT */
    .post('/create', upLoadImageProduct.single("image"), productsControllers.store, productsValidator)

/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', productsControllers.productDetail)


/* GET PRODUCT MODIFY FORM */
router
    .get("/edit/:id", productsControllers.modify, productsValidator)//saque temporalmente adminInSessionCheck
    .put("/edit/:id", upLoadImageProduct.single("image"), productsControllers.update)//saque temporalmente adminInSessionCheck
    .delete('/edit/delete/:id', productsControllers.destroy);//saque temporalmente adminInSessionCheck

/* DELETE ONE PRODUCT */
/* EXPORT ROUTER */
module.exports = router;