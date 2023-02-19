const multer = require('multer');
const path = require('path');

const storeImageProduct = multer.diskStorage({
    destination: function(req, file, callback){
        const folder = "../../public/images/products"
        callback(null, folder)
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}}`)
    }
});

const upLoadImageProduct = multer({
    storage : storeImageProduct, 
});

module.exports = {
    upLoadImageProduct
}