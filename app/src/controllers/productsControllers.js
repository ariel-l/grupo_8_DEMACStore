module.exports = {
    productDetail: (req, res) => {
        return res.render('products/productDetail')
    },
    modify: (req, res) => {
        return res.render('products/productModify')
    },
    cart: (req, res) => {
        return res.render('products/cart')
    },
    create: (req, res) => {
        return res.render('products/productCreate')
    }
}