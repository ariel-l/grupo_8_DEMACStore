const { readJSON } = require('../database')

const products = readJSON('products.json')
const formatNumber = number => number.toLocaleString('es-AR', {maximumFractionDigits:0});

module.exports = {
    index: (req, res) => {

        const productsInSale = products.filter(product => product.discount > 0)
        const productsRecommended = products.filter(product => product.category === 'refurbished')


        return res.render('home', {
            productsInSale,
            productsRecommended,
            formatNumber
        })
    }
}

