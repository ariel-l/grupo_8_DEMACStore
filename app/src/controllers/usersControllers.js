const { readJSON, writeJSON } = require('../database/index');
const users = readJSON('users.json');

module.exports = {
    login: (req, res) => {
        return res.render('users/login')
    },
    register: (req, res) => {
        return res.render('users/register')
    },
    editProfile: (req, res) => {
        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);

        res.render('users/userEditProfile', {
            user: userInSession,
            session: req.session
        })
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmty()){
            let userId = req.session.user.id;
            let user = users.find(user => user.id === userId);
    
            const {
                username,
                name,
                lastName,
                tel,
                adress,
                postal_code,
                province,
                city
            } = req.body;
    
            user.username = username;
            user.name = name;
            user.lastName = lastName;
            user.avatar = req.file ? req.file.filename : user.avatar;
            user.tel = tel;
            user.adress = adress;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
        
        }

    
        writeJSON('users.json', users)

        res.redirect('/')
    },
}