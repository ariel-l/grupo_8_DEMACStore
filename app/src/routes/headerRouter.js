const express = require("express");
const router = express.Router();
const controller = require("../controllers/headerController");

router.get('/', controller.header);

module.exports = router;