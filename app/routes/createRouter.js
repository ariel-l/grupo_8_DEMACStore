const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.get('/', controller.create);

module.exports = router;