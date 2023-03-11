const { users } = require("../database");
const { validationResult } = require("express-validator");

module.exports = {
    login: (req, res) => {
        res.render("users/login", { session: req.session })
    },
    processLogin: (req, res) => {
        // let errors = validationResult(req);

        // if (errors.isEmpty()) {

        //     let user = users.find(user => user.email === req.body.email);

        //     req.session.user = {
        //         id: user.id,
        //         firstName: user.firstName,
        //         image: user.image,
        //         category: user.category
        //     }

        //     let cookieLifeTime = new Date(Date.now() + 60000);

        //     if(req.body.remember) {
        //         res.cookie(
        //             "userDemac", 
        //             req.session.user, 
        //             {
        //                 expires: cookieLifeTime,
        //                 httpOnly: true
        //             })
        //     }

        //     res.locals.user = req.session.user;

        //     res.redirect("/");
        // } else {
        //     return res.render("users/login", {
        //         errors: errors.mapped(),
        //         session: req.session
        //     })
        // }
        // let errors = validationResult(req);

        // if (errors.isEmpty()) {

        //     let user = users.find(user => user.email === req.body.email);

        //     req.session.user = {
        //         id: user.id,
        //         firstName: user.firstName,
        //         image: user.image,
        //         category: user.category
        //     }

        //     res.locals.user = req.session.user;

        //     res.redirect("/");
        // } else {
        //     return res.render("users/login", {
        //         errors: errors.mapped(),
        //         session: req.session
        //     })
        // }
        res.send(users)
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userDemac){
            res.cookie("userDemac", "", {maxAge: -1})
        }

        res.redirect("/");

    },
    register: (req, res) => {
        return res.render('/users/register')
    }
}