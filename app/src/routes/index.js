const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeController");


/* GET HOME PAGE */
router.get('/', controller.index);



/* EXPORT ROUTER */
module.exports = router;