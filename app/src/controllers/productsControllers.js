const { readJSON, writeJSON } = require('../database/index');

const products = readJSON('products.json');
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

        const shuffleProducts = [...products]
        shuffle(shuffleProducts)

        return res.render('products/products', {
            shuffleProducts,
            formatNumber,
        })
    },

    productDetail: (req, res) => {

        const productId = Number(req.params.id);

        const product = products.find(product => product.id === productId);

        res.render("products/productDetail", {
            product,
            formatNumber
        })
    },

    cart: (req, res) => {
        return res.render('products/cart')
    },

    create: (req, res) => {
        return res.render('products/productCreate')
    }, 

    store: (req, res) => {

        const lastId = products[products.length -1].id;

		const newProduct = {
			id: lastId + 1,
			image: req.file ? req.file.filename : "default-image.png" ,
            ...req.body
		}

		products.push(newProduct);

		writeJSON('products.json', products);

		res.redirect("/products/" + newProduct.id);    
    },

    modify: (req, res) => {

        const productId = Number(req.params.id);

        const productToEdit = products.find((product) => {
              return product.id === productId;
        });
        res.render("products/productModify", { productToEdit });
    },

    update: (req, res) => {

        const productId = Number(req.params.id);

        products.forEach((product) => {
            if (product.id === productId) {
                product.name = req.body.name;
                product.discount = +req.body.discount;
                product.price = +req.body.price;
                product.image = req.file ? req.file.filename : product.image;                   
                product.category = req.body.category;
                product.brand = req.body.brand;
                product.model = req.body.model;
                product.os = req.body.os;
                product.screen = +req.body.screen;
                product.internalMemory = +req.body.internalMemory;
                product.ram = +req.body.ram;
                product.frontCamera = +req.body.frontCamera;
                product.chipset = req.body.chipset;
                product.mainCamera = +req.body.mainCamera;
                product.video = req.body.video;
                product.dimensions = +req.body.dimensions;
                product.battery = +req.body.battery;
                product.weight = +req.body.weight;
                product.cardSlot = req.body.cardSlot;
                product.description = req.body.description;                
     }
    });

    writeJSON('products.json', products);

    res.redirect("/products/" + productId);
},

    destroy : (req, res) => {

        const productId = Number(req.params.id);

        products.forEach(product => {
            if (product.id === productId){
                const productToDestroy = products.indexOf(product);
                products.splice(productToDestroy, 1)
        }
    });
    
    writeJSON('products.json', products)

    res.redirect("/");
}
};
