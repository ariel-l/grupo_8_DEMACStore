const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User, Address } = require("../database/models");

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
            };

            User.create(newUser)
                .then(() => {
                    return res.redirect('/users/login');
                })
                .catch(error => console.log(error));
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            });
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
                .then((user) => {
                    req.session.user = {
                        id: user.id,
                        name: user.name,//o username VERIFICAR
                        avatar: user.avatar,
                        role: user.role
                    }

                    const cookieLifeTime = new Date(Date.now() + 6000000);

                    if (req.body.remember) {
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

        User.findByPk(userInSessionId, {
            include: [{ association: "address" }]
        })
            .then((user) => {
                res.render('users/userProfile', {
                    user,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },

    editProfile: (req, res) => {
        const userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId, {
            include: [{ association: "address" }]
        })
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

        if (errors.isEmpty()) {
            const userId = req.session.user.id;

            const {
                username,
                name,
                lastName,
                phone,
                address,
                postal_code,
                province,
                city
            } = req.body;

            User.findByPk(userId, {
                include: [{
                    model: Address,
                    as: 'address'
                }]
            })
                .then((user) => {
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }

                    if (!user.address) {
                        return Address.create({
                            address,
                            postal_code,
                            province,
                            city,
                            userId
                        })
                        .then((newAddress) => {
                            user.username = username;
                            user.name = name;
                            user.lastName = lastName;
                            user.phone = phone;
                            user.addressId = newAddress.id;
                            if (req.file) {
                                user.avatar = req.file.filename;
                            }
                            return user.save();
                        });
                    } else {
                    user.username = username;
                    user.name = name;
                    user.lastName = lastName;
                    user.phone = phone;
                    user.address.address = address;
                    user.address.postal_code = postal_code;
                    user.address.province = province;
                    user.address.city = city;
                    if (req.file) {
                        user.avatar = req.file.filename;
                    }
                    return Promise.all([user.save(), user.address.save()]);
                    }
                })
                .then(() => {
                    return res.redirect('/users/profile');
                })
                .catch(error => console.log(error))
        } else {
            const userInSessionId = req.session.user.id;

            return res.render('users/userEditProfile', {
                user: userInSessionId,
                session: req.session,
                errors: errors.mapped(),
            });
        }
    },

    logout: (req, res) => {

        req.session.destroy();
        res.clearCookie("userDemac");

        res.redirect("/");

    },

    destroy: (req, res) => {

        const userId = req.session.user.id;

        User.findByPk(userId, {
            include: [{
                model: Address,
                as: 'address'
            }]
        })
            .then(userToDestroy => {
                if (userToDestroy) {
                    const address = userToDestroy.address;
                    if (address) {
                        return address.destroy();
                    } else {
                        return null;
                    }
                    } else {
                        return null;
                    }
                })
                .then(() => {
                    return User.destroy({
                        where: {
                            id: userId
                        }
                    });
                })
                .then(() => {
                    req.session.destroy();
                    res.clearCookie('userDemac');
                    return res.redirect('/');
                })
                .catch(error => {
                    console.log(error);
                });
    }
}