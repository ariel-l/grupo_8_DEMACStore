const { readJSON, writeJSON } = require('../database')

const products = readJSON('products.json')
const formatNumber = number => number.toLocaleString('es-AR', {maximumFractionDigits:0});

module.exports = {
    index: (req, res) => {
        return res.render('products/products', {
            products,
            formatNumber,
        })
    },
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