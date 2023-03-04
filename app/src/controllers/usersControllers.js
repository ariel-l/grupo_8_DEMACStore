const { readJSON, writeJSON } = require('../database/index');

const users = readJSON('users.json');

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
    }
}