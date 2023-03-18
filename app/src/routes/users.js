const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");


/* GET LOGIN PAGE  */
router.get('/login', controller.login);

/* GET REGISTER PAGE */
router.get('/register', controller.register);

/* GET - USER PROFILE EDIT FORM */
router.get('/profile/edit', userInSessionCheck, editProfile);

/* PUT - USER PROFILE EDIT FORM */
router.put('/profile/edit', updateProfile )

/* EXPORT ROUTER */
module.exports = router;