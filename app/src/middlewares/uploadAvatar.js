const multer = require('multer');
const path = require('path');

const storeImageAvatar = multer.diskStorage({
    destination: function(req, file, callback){
        const folder = "public/images/users"
        callback(null, folder)
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`)
    }
});

const upLoadImageAvatar = multer({
    storage : storeImageAvatar, 
});

module.exports = {
    upLoadImageAvatar
}