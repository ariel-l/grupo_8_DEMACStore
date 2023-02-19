const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, './products.json');

module.exports = {
    readJSON: (json) => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
    },
    writeJSON: (json, products) => {
        fs.writeFileSync(productsFilePath, JSON.stringify(products),  'utf-8')
    }
}
