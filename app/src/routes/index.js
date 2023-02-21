const express = require("express");
const router = express.Router();
const { index, search } = require("../controllers/homeController");


/* GET HOME PAGE */
router.get('/', index);

/* GET RESULTS PRODUCTS PAGE */
router.get('/search', search)


/* EXPORT ROUTER */
module.exports = router;