const express = require("express");
const router = express.Router();
const { login, register, processLogin, logout, profile } = require("../controllers/usersControllers")
const loginValidator = require("../validations/loginValidator")
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const adminInSessionCheck = require("../middlewares/adminInSessionCheck");

/* GET LOGIN PAGE  */
router.get("/login", login); 

/*POST LOGIN USER */
router.post("/login", loginValidator, processLogin);

/* GET LOGOUT USER*/
router.get("/logout", logout)

/* GET REGISTER PAGE */
router.get('/register', userInSessionCheck, adminInSessionCheck, register);

/* GET USER PROFILE PAGE */
router.get('/profile', userInSessionCheck, profile);

/* GET - USER PROFILE EDIT FORM */

/* EXPORT ROUTER */
module.exports = router;