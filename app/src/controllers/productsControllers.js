const fs = require ('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    productDetail: (req, res) => {
        let productId = Number(req.params.id);
        let product = products.find(product = product.id === productId);

        res.render("productDetail", {
            product,
            toThousand
        })
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
