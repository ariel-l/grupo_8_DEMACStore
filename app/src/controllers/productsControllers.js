const { readJSON, writeJSON } = require('../database/index');
const products = readJSON('products.json');
const formatNumber = number => number.toLocaleString('es-AR', {maximumFractionDigits:0});

module.exports = {
    index: (req, res) => {
        return res.render('products/products', {
            products,
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
			name: req.body.name,
			discount: +req.body.discount,
			price: +req.body.price,
			image: req.file ? req.file.filename : "default-image.png" ,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            os: req.body.os,
            screen: +req.body.screen,
            internalMemory: +req.body.internalMemory,
            ram: +req.body.ram,
            frontCamera: +req.body.frontCamera,
            chipset: req.body.chipset,
            mainCamera: +req.body.mainCamera,
            video: req.body.video,
            dimensions: +req.body.dimensions,
            battery: +req.body.battery,
            weight: +req.body.weight,
            cardSlot : +req.body.cardSlot,
			description:req.body.description,
		}

		products.push(newProduct);

		writeJSON('products.json', products);

		res.redirect("/products/" + newProduct.id);    
    },
    modify: (req, res) => {
        let productId = Number(req.params.id);
        let productToEdit = products.find((product) => {
              return product.id === productId;
        });
        res.render("products/productModify", { productToEdit });
    },
    update: (req, res) => {
    let productId = Number(req.params.id);

    products.forEach((product) => {
          if (product.id === productId) {
                product.name = req.body.name,
                product.discount = +req.body.discount,
                product.price = +req.body.price,
                product.image = req.file ? req.file.filename : product.image,                   
                product.category = req.body.category,
                product.brand = req.body.brand,
                product.model = req.body.model,
                product.os = req.body.os,
                product.screen = +req.body.screen,
                product.internalMemory = +req.body.internalMemory,
                product.ram = +req.body.ram,
                product.frontCamera = +req.body.frontCamera,
                product.chipset = req.body.chipset,
                product.mainCamera = +req.body.mainCamera,
                product.video = req.body.video,
                product.dimensions = +req.body.dimensions,
                product.battery = +req.body.battery,
                product.weight = +req.body.weight,
                product.cardSlot = req.body.cardSlot,
                product.description = req.body.description                     
     }
    });
    writeJSON('products.json', products);
    res.redirect("/");
}
}
