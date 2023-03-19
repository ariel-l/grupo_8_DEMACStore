const express = require("express");
const router = express.Router();
const { login, register, processLogin, logout, profile, destroy, processRegister, editProfile, updateProfile} = require("../controllers/usersControllers")
const loginValidator = require("../validations/loginValidator")
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const adminInSessionCheck = require("../middlewares/adminInSessionCheck");
const sessionUserCheck = require('../middlewares/sessionUserCheck');
const { upLoadImageAvatar } = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');
const editProfileValidator = require('../validations/editProfileValidator');


/* GET LOGIN PAGE  */
router.get("/login", sessionUserCheck, login); 

/* POST LOGIN USER */
router.post("/login", loginValidator, processLogin);

/* GET LOGOUT USER */
router.get("/logout", logout)

/* GET REGISTER PAGE */
router.get('/register', sessionUserCheck, register);

/* POST REGISTER USER */
router.post('/register', upLoadImageAvatar.single('avatar'), registerValidator, processRegister)

/* GET USER PROFILE PAGE */
router.get('/profile', userInSessionCheck, profile);
/* GET - USER PROFILE EDIT FORM */
router.get('/profile/edit', userInSessionCheck, editProfile);
/* PUT - USER PROFILE EDIT FORM */
router.put('/profile/edit', upLoadImageAvatar.single('avatar'), editProfileValidator, updateProfile)

router.delete('/profile', userInSessionCheck, destroy);
/* EXPORT ROUTER */
module.exports = router;