const express = require("express");
const router = express.Router();
const { login, register, processLogin, logout, profile, destroy, } = require("../controllers/usersControllers")
const loginValidator = require("../validations/loginValidator")
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const adminInSessionCheck = require("../middlewares/adminInSessionCheck");const { upLoadImageAvatar } = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator')


/* GET LOGIN PAGE  */
router.get("/login", login); 

/* POST LOGIN USER */
router.post("/login", loginValidator, processLogin);

/* GET LOGOUT USER */
router.get("/logout", logout)

/* GET REGISTER PAGE */
router.get('/register', userInSessionCheck, adminInSessionCheck, register);

/* POST REGISTER USER */
router.post('/register', upLoadImageAvatar.single('avatar'), registerValidator, controller.processRegister)

/* GET USER PROFILE PAGE */
router.get('/profile', userInSessionCheck, profile);

router.delete('/profile', adminInSessionCheck, destroy);
/* EXPORT ROUTER */
module.exports = router;