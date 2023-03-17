const { readJSON, writeJSON } = require('../database');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const users = readJSON('users.json')


module.exports = {
    login: (req, res) => {
        return res.render('users/login')
    },
    register: (req, res) => {
        return res.render('users/register')
    },
    profile: (req, res) => {

        const userId = Number(req.params.id);

        const user = users.find(user => user.id === userId);

        res.render('users/userProfile'), {
            user
        }
    },

    processRegister: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            
            const lastId = users[users.length -1].id;

            const { username, email, password } = req.body

            const newUser = {
            id: lastId + 1,
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            name: '',
            lastName: '',
            avatar: req.file ? req.file.filename : 'default-image.png',
            rol: 'user',
            tel: '',
            address: '',
            postal_code: '',
            province: '',
            city: '',
        }

        users.push(newUser)

        writeJSON('users.json', users)

        res.redirect('/')

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}