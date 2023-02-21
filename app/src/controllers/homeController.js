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
    },

    search: (req, res) => {
        const { keywords } = req.query

        const toLowerAndArray = string => string.toLowerCase().split(' ')

        const findWord = array => array.some(word => keywords.toLowerCase().includes(word))

        const results = products.filter(product => findWord(toLowerAndArray(product.name)))

        res.render('results', {
            keywords,
            results,
            formatNumber
        })
    }
}

