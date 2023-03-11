const express = require("express");
const router = express.Router();
const { login, register, processLogin, logout } = require("../controllers/usersControllers")
const loginValidator = require("../validations/loginValidator")


/* GET LOGIN PAGE  */
router.get("/login", login); 

/*POST LOGIN USER */
router.post("/login", loginValidator, processLogin);

/* GET LOGOUT USER*/
router.get("/logout", logout)

/* GET REGISTER PAGE */
router.get('/register', register);

/* EXPORT ROUTER */
module.exports = router;