const {readJSON, writeJSON} = require('../database/index')
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
    }, 
    store: (req, res) => {
        const products = readJSON('products.json')

        let lastId = products[products.length -1].id;

		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			discount: req.body.discount,
			price: req.body.price,
			image: req.file ? req.file.filename : "default-image.png" ,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            os: req.body.os,
            screen: req.body.screen,
            internalMemory: req.body.internalMemory,
            ram: req.body.ram,
            frontCamera: req.body.frontCamera,
            chipset: req.body.chipset,
            mainCamera: req.body.mainCamera,
            video: req.body.video,
            dimensions: req.body.dimensions,
            battery: req.body.battery,
            weight: req.body.weight,
            cardSlot : req.body.cardSlot,
			description:req.body.description,
		}

		products.push(newProduct);

		writeJSON('products.json', products);

		res.redirect("/");    
    }
}