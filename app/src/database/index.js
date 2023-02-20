const fs = require('fs');
const path = require('path');


module.exports = {
    readJSON: (json) => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, json)))
    },
    writeJSON: (json, array) => {
        fs.writeFileSync(path.join(__dirname, json), JSON.stringify(array),  'utf-8')
    }
}
