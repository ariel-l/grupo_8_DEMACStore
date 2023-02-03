const express = require("express");
const router = express.Router();
const controller = require("../controllers/modifyController");

router.get('/', controller.modify);

module.exports = router;