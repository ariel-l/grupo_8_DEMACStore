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
			image: req.file ? req.filename : null ,
            subcategory: req.body.subcategory,
            brand: req.body.brand,
            model: req.body.model,
            sistem: req.body.sistem,
            screen: req.body.screen,
            internalMemory: req.body.internalMemory,
            ram: req.body.ram,
            processor: req.body.processor,
            frontCamera: req.body.frontCamera,
            rearCamera: req.body.rearCamera,
            video: req.body.video,
            battery: req.body.battery,
            dimensions: req.body.dimensions,
            weight: req.body.weight,
			description:req.body.description,
			category: req.body.category,
		}

		products.push(newProduct);

		writeJson(products);

		res.redirect("/");    
    }
}