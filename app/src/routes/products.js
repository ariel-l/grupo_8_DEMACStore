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

/* GET - List products for category */
router
    .get("/category/:id", productsControllers.category)

router
    .get("/subcategory/:id", productsControllers.subcategory)

/* GET CART PAGE */
router
    .get('/cart', userInSessionCheck, productsControllers.cart)

/* GET PRODUCT ADMIN PAGE */
router
     .get('/adminList', adminInSessionCheck, productsControllers.productsList)

/* GET PRODUCT CREATE FORM PAGE */
router
    .get('/create', adminInSessionCheck, productsControllers.create, productsValidator)
/* CREATE ONE PRODUCT */
    .post('/create', upLoadImageProduct.single("image"), productsControllers.store, productsValidator)

/* GET PRODUCT DETAIL PAGE */
router
    .get('/:id', productsControllers.productDetail)


/* GET PRODUCT MODIFY FORM */
router
    .get("/edit/:id", adminInSessionCheck, productsControllers.modify, productsValidator)
    .put("/edit/:id", adminInSessionCheck, upLoadImageProduct.single("image"), productsControllers.update)

/* DELETE ONE PRODUCT */
    .delete('/edit/delete/:id', adminInSessionCheck, productsControllers.destroy);


/* EXPORT ROUTER */
module.exports = router;