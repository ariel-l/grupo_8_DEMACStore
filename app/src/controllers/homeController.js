const { readJSON } = require('../database')

const products = readJSON('products.json')
const formatNumber = number => number.toLocaleString('es-AR', {maximumFractionDigits:0});

function shuffle(array) {
    let currentIndex = array.length; let  randomIndex;
  
    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

module.exports = {
    index: (req, res) => {

        const productsInSale = shuffle(products.filter(product => product.discount > 0))

        const productsRecommended = shuffle(products.filter(product => product.category === 'refubrished'))

        return res.render('home', {
            products,
            productsInSale,
            productsRecommended,
            formatNumber,
            session: req.session
        })
    },

    search: (req, res) => {
        const { keywords } = req.query

        const toLowerAndArray = string => string.toLowerCase().split(' ')

        const findWord = array => array.some(word => keywords.toLowerCase().includes(word))

        const results = shuffle(products.filter(product => findWord(toLowerAndArray(product.name))))

        res.render('results', {
            keywords,
            results,
            formatNumber,
            session: req.session
        })
    }
}

