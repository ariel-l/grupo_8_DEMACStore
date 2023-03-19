const { readJSON, writeJSON } = require('../database');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const users = readJSON('users.json')


module.exports = {

    register: (req, res) => {
        res.render('users/register', {
            session: req.session
        })
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

        res.redirect('/users/login')

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },

    login: (req, res) => {

        res.render("users/login", { session: req.session })

    },

    processLogin: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                avatar: user.avatar,
                rol: user.rol
            }

            const cookieLifeTime = new Date(Date.now() + 60000);

            if(req.body.remember) {
                res.cookie(
                    "userDemac", 
                    req.session.user, 
                    {
                        expires: cookieLifeTime,
                        httpOnly: true
                    })
            }

            res.locals.user = req.session.user;

            res.redirect("/users/profile");
        } else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },

    profile: (req, res) => {

        const userInSessionId = req.session.user.id;

        const userInSession = users.find(user => user.id === userInSessionId);
        
        res.render('users/userProfile', {
            user: userInSession,
            session: req.session
        })
    },

    destroy: (req, res) => {

        const userInSessionId = req.session.user.id;
        
        users.forEach(user => {
            if (user.id === userInSessionId){
                const userToDestroy = users.indexOf(user);
                users.splice(userToDestroy, 1);
                req.session.destroy()
        }
    });
    
    writeJSON('users.json', users)

    return res.redirect('/users/profile');
    },

    logout: (req, res) => {
        
        req.session.destroy();
        if(req.cookies.userDemac){
            res.cookie("userDemac", "", {maxAge: -1})
        }

        res.redirect("/");

    },

}