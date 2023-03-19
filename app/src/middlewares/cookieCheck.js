module.exports = (req, res, next) => {
    if(req.cookies.userDemac && !req.session.user) {
        req.session.user = req.cookies.userDemac;
        res.locals.user = req.session.user;
    }
    next();
}