const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsControllers");

router.get('/cart', controller.cart);
router.get('/productCreate', controller.create);
router.get('/productModify', controller.modify);
router.get('/productDetail', controller.productDetail);

module.exports = router;