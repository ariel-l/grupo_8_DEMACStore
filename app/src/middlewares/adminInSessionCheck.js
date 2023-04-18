const { User } = require ('../database/models');

module.exports = async (req, res, next) => {
    try{
        if (!req.session.user) {
            return res.redirect("/users/login"); 
    }

    const user = await User.findOne({ where: { id: req.session.user.id } });

    if (user.role !== "admin") {
        return res.redirect("/home");
    }
        next();
    } catch (error) {
        console.error("Error en la validación de rol de usuario:", error);
        res.redirect("/"); 
    }
};