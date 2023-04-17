const { validationResult } = require('express-validator');
const { Product, Sequelize, Category, Subcategory } = require('../database/models');
const productsValidator = require('../middlewares/productsValidator');
const { Op } = Sequelize;

const formatNumber = number => number.toLocaleString('es-AR', {maximumFractionDigits:0});
/*
function shuffle(array) {
    let currentIndex = array.length; let  randomIndex;
  
    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }*/

module.exports = {

    index: (req, res) => {
        Product.findAll({
            include: [
                {
                    association: "subcategories",
                    include: {
                        association: "categories",
                    }
                }
            ]
        })
        .then((products) => {
            return res.render('products/products', {
                //productsInSale,
                //productsRecommended,
                products,
                //productsAccesories,
                formatNumber,
                session: req.session
            })
        })
        .catch(error => console.log(error));
    },

    productDetail: async (req, res) => {
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
    },/*
    category: (req, res) => {
        const categoryID = req.params.id;

        Category.findByPk(categoryID, {
            include: [
                { association: "subcategories",
                include: { association: "products"},
            }]
        })
        .then((category) => {
            const PRODUCTS = category.subcategories.map(
                (subcategory) => subcategory.products
            );
            return res.render("categories", {
                category,
                subcategories: category.subcategories,
                products: PRODUCTS.flat(),
                session: req.session,
            });
        })
        .catch((error) => console.log(error));
    },*/

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
        const errors = validationResult(req);

		const newProduct = {
			name: req.body.name,
			discount: +req.body.discount,
			price: +req.body.price,
			image: req.file ? req.file.filename : "default-image.png" ,
            subcategoryID: req.body.subCategory,
            brandID: req.body.brand,
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

        if(errors.isEmpty()){
		Product.create(newProduct)
        .then(() => {
            res.redirect(`/products/${newProduct.id}`);
        })  
        .catch((error) => console.log(error))
        
        } else {
            return res.render('products/productCreate', {errors: errors.mapped()})
        }
    },

    modify: (req, res) => {

        const productId = req.params.id;

        Product.findByPk(productId)
        .then((productToEdit) => {
            res.render("products/productModify", {
                productToEdit,
                 session: req.session 
            })
        })
        .catch(error => console.log(error))
    },

    update: (req, res) => {
        const errors = validationResult(req);
        const productId = Number(req.params.id);

        if(errors.isEmpty()){
        const {
            name,
			discount,
			price,
			image,
            subcategoryID,
            brandID,
            model,
            os,
            screen,
            internalMemory,
            ram,
            frontCamera,
            chipset,
            mainCamera,
            video,
            dimensions,
            battery,
            weight,
            cardSlot,
			description,
        } = req.body;

        Product.update({
            name,
			discount,
			price,
			image,
            subcategoryID,
            brandID,
            model,
            os,
            screen,
            internalMemory,
            ram,
            frontCamera,
            chipset,
            mainCamera,
            video,
            dimensions,
            battery,
            weight,
            cardSlot,
			description,
        },{
            where: {
                id: productId,
            },
        })
        .then((response) => {
            if(response){
                return res.redirect(`/products/${productId}`)
            } else {
                throw new Error('Mensaje de error')
            }
        })       
        .catch(error => console.log(error));
        } else {
            Product.findByPk(productId)
            .then(Product => {
                return res.render('products/productModify', {
                Product,
                errors: errors.mapped()
                })
            })
        .catch(error => console.log(error));
        }
     },

    destroy: (req, res) => {

        const productId = Number(req.params.id);

        Product.destroy({
            where: {
                id: productId
            }
        })
        .then(() => {
            return res.redirect("/"); 
        })
        .catch(error => console.log(error))
    }
};
