const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User, Address } = require("../database/models");

module.exports = {

    usersList: (req, res) => {
        User.findAll()
         .then((users) => {
             return res.render('users/adminUsers', {
                 users,
                 session: req.session
             })
         })
         .catch(error => console.log(error));
  },
}