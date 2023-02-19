const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsControllers");
const { upLoadImageProduct } = require('../middlewares/upload')

router.get('/cart', controller.cart);

router.get('/productModify', controller.modify);
router.get('/productDetail', controller.productDetail);

router.get('/productCreate', controller.create);
router.post('/', upLoadImageProduct.single("image"), controller.store);

module.exports = router;