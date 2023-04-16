//const { readJSON, writeJSON } = require('../database');
//const users = readJSON('users.json');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require("../database/models");



module.exports = {

    register: (req, res) => {
        res.render('users/register', {
            session: req.session
        })
    },

    processRegister: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : 'default-image.png',
            role: 'user',
        }

        User.create(newUser)
        .then(() => {
          return res.redirect('/users/login');
        })
        .catch(error => console.log(error))
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },

    login: (req, res) => {

        res.render('users/login', { session: req.session })

    },

    processLogin: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((user)  => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role
                }

            const cookieLifeTime = new Date(Date.now() + 6000000);

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
        }) 
        .catch(error => console.log())
        } else {
            return res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },

    profile: (req, res) => {

        const userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((user) => {
            res.render('users/userProfile', {
                user,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },

    destroy: (req, res) => {

        const userInSessionId = req.session.user.id;
        
        users.forEach(user => {
            if (user.id === userInSessionId){
                const userToDestroy = users.indexOf(user);
                users.splice(userToDestroy, 1);
                req.session.destroy();
                res.clearCookie("userDemac");

        }
    });
    
    writeJSON('users.json', users)

    return res.redirect('/');
    },

    logout: (req, res) => {
        
        req.session.destroy();
        res.clearCookie("userDemac");

        res.redirect("/");

    },

    editProfile: (req, res) => {
        const userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((user) => {
            res.render('users/userEditProfile', {
                user,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },

    updateProfile: (req, res) => {
            const errors = validationResult(req);
            if(errors.isEmpty()){
                const userId = req.session.user.id;
        
                const {
                    username,
                    name,
                    lastName,
                    tel,
                    address,
                    postal_code,
                    province,
                    city
                } = req.body;
        
                User.update({
                username,
                    name,
                    lastName,
                    tel,
                    address,
                    postal_code,
                    province,
                    city,
                    image,
            },{
                where:{
                    id: userId
                },
            })
            .then((response) => {
                if(response){
                    return res.redirect(`users/profileDetail${userId}`)
                } else {
                    throw new Error('Error al editar datos')
                }
            })
            .catch(error => console.log(error))

            delete user.pass;

            req.session.user = user;

            return res.redirect("/users/profile");
     
        }else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

             return res.render("users/userEditProfile", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }

}