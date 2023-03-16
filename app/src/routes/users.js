const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");
const { upLoadImageAvatar } = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator')


/* GET LOGIN PAGE  */
router.get('/login', controller.login);

/* GET REGISTER PAGE */
router.get('/register', controller.register);

/* POST REGISTER USER */
router.post('/register', upLoadImageAvatar.single('avatar'), registerValidator, controller.processRegister)


/* EXPORT ROUTER */
module.exports = router;