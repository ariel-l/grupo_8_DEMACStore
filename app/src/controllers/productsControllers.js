//const { readJSON, writeJSON } = require('../database/index');
//const products = readJSON('products.json');
const { Product, Sequelize, Category, Subcategory } = require('../database/models');
const { Op } = Sequelize;

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
            session: req.session
        })
    },

    productDetail: async (req, res) => {
        /*
        const { id } = req.params;
        try {
            console.log()
          const product = await Product.findByPk(id);
          if (product) {
            res.render('products/productDetail', {product});
          } else {
            res.send({ message: "Producto no encontrado" });
          }
        } catch (error) {
          res.send( error );
        }
      },*/
        const productId = Number(req.params.id);

        Product.findByPk(productId, {
            include: [{ association: "brands" }]
        })
        .then(product => {
            res.render("products/productDetail", {
                product,
                formatNumber,
                session: req.session
            })
        })
        .catch((error) => console.log(error));
    },
    category: (req, res) => {
        const categoryID = req.params.id;

        Category.findByPk(categoryID, {
            include: [
                { association: "subcategories",
                include: { association: "products"},
            }]
        })
        .then((category) => {
            return res.send(category);
            /*const PRODUCTS = category.subcategories.map(
                (subcategory) => subcategory.products
            );
            return res.render("categories", {
                category,
                subcategories: category.subcategories,
                products: PRODUCTS.flat(),
                session: req.session,
            });*/
        })
        .catch((error) => console.log(error));
    },

    cart: (req, res) => {
        return res.render('products/cart', {
            session: req.session
        })
    },

    create: (req, res) => {
        return res.render('products/productCreate', {
            session: req.session
        })
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

        const productId = Number(req.params.id);

        const productToEdit = products.find((product) => {
              return product.id === productId;
        });
        res.render("products/productModify", { productToEdit, session: req.session });
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
