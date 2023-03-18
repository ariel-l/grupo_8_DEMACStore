const { users, writeJSON} = require("../database");
const { validationResult } = require("express-validator");

module.exports = {
    login: (req, res) => {
        res.render("users/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                image: user.image,
                rol: user.rol
            }

            let cookieLifeTime = new Date(Date.now() + 60000);

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
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userDemac){
            res.cookie("userDemac", "", {maxAge: -1})
        }

        res.redirect("/");

    },
    register: (req, res) => {
        res.render('users/register', {
            session: req.session
        })
    },
    profile: (req, res) => {

        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);
        
        res.render('users/userProfile', {
            user: userInSession,
            session: req.session
        })
    },
    destroy : (req, res) => {

        let userInSessionId = req.session.user.id;
        
        users.forEach(user => {
            if (user.id === userInSessionId){
                const userToDestroy = users.indexOf(user);
                users.splice(userToDestroy, 1);
                req.session.destroy()
        }
    });
    
    writeJSON('users.json', users)

    delete user.pass;

    req.session.user = user;

    return res.redirect('/users/profile');
}
}