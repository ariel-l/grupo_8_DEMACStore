const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");


/* GET LOGIN PAGE  */
router.get('/login', controller.login);

/* GET REGISTER PAGE */
router.get('/register', controller.register);

/* GET USER PROFILE PAGE */
router.get('/profile', controller.profile);

/* EXPORT ROUTER */
module.exports = router;