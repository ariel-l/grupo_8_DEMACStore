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
    searchProduct: async (req, res) => {
        let search = req.query
        try {
            const products = await Product.findAll({
                where: {
                    [sequelize.Op.or]: [
                        { nombre: { [sequelize.Op.substring]: search } },
                        { marca: { [sequelize.Op.substring]: search } },
                        { subcategoría: { [sequelize.Op.substring]: search } },
                    ]
                },
            });
            res.render('products/adminProducts', {
                title: `Productos filtrados por ${search}`,
                products,
            });
        } catch (error) {
            console.log(error);
        }
    }
}





