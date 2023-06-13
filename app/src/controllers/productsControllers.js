const { check, validationResult } = require('express-validator');
const { Product, Sequelize, Category, Subcategory, Brand, Order, OrderProduct } = require('../database/models');
const { Op } = Sequelize;
const { productsRecommended } = require('../../public/js/carouselRecommended');

const formatNumber = number => number.toLocaleString('es-AR', { maximumFractionDigits: 0 });

function shuffle(array) {
    let currentIndex = array.length; let randomIndex;

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
    productsList: (req, res) => {
        Product.findAll({
            include: [
                {
                    association: "subcategories",
                    include: {
                        association: "categories",
                    }
                },
                {
                    association: "brands"
                }
            ]
        })
            .then((products) => {
                const spanishSubcategories = {
                    'News': 'Nuevo',
                    'Refubrishes': 'Refabricado'
                }
                const modifyProducts = products.map((product) => {
                    const subcategoryName = product.subcategories.name;
                    if (spanishSubcategories[subcategoryName]) {
                        product.subcategories.name = spanishSubcategories[subcategoryName];
                    }
                    return product;
                })
                return res.render('products/adminProducts', {
                    products,
                    formatNumber,
                    session: req.session
                })
            })
            .catch(error => console.log(error));
    },

    productDetail: async (req, res) => {
        const productId = Number(req.params.id);
      
        try {
          const product = await Product.findByPk(productId, {
            include: [
              {
                association: "subcategories",
                include: {
                  association: "categories",
                },
              },
              {
                association: "brands",
              },
            ],
          });
      
          const productsRecommended = await Category.findByPk(2, {
            include: [
              {
                model: Subcategory,
                as: "subcategories",
                include: {
                  model: Product,
                  as: "products",
                },
              },
            ],
          });
      
          if (!productsRecommended) {
            return res.status(404).send("Categoría no encontrada");
          }
      
          const recommendedProducts = productsRecommended.subcategories
            .map((subcategory) => subcategory.products)
            .flat();
      
          res.render("products/productDetail", {
            product,
            productsRecommended: recommendedProducts,
            formatNumber,
            session: req.session,
          });
        } catch (error) {
          console.log(error);
        }
      },
      
    category: (req, res) => {
        const categoryID = req.params.id;

        Category.findByPk(categoryID, {
            include: [
                {
                    association: "subcategories",
                    include: { association: "products" },
                }]
        })
            .then((category) => {
                if (!category) {
                    return res.status(404).send('Categoría no encontrada');
                }

                const PRODUCTS = category.subcategories.map(
                    (subcategory) => subcategory.products
                );
                console.log(category)
                return res.render('products/categories', {
                    category,
                    subcategories: category.subcategories,
                    products: PRODUCTS.flat(),
                    session: req.session,
                    formatNumber,
                });
            })
            .catch((error) => console.log(error));
    },
    subcategory: async (req, res) => {
        try {
            const subcategory = await Subcategory.findByPk(req.params.id, {
                include: [{ association: "products" }]
            });

            if (!subcategory) {
                return res.status(404).send('Esta subcategoría no encontrada');
            }

            const products = subcategory.products.flat();

            return res.render('products/subcategories', {
                ...subcategory.dataValues,
                subcategories: subcategory.subcategories,
                products,
                session: req.session,
                formatNumber,
                subcategory,
            });
        } catch (error) {
            console.log(error);
        }
    },

    cart: async (req, res) => {
        try {
          const userID = req.session.user.id;
      
          const order = await Order.findOne({
            where: {
              userID
            },
            include: [
              {
                model: OrderProduct,
                as: "orderProducts",
                include: {
                  model: Product,
                  as: "products"
                }
              }
            ]
          });
          const productsRecommended = await Category.findByPk(2, {
            include: [
              {
                model: Subcategory,
                as: "subcategories",
                include: {
                  model: Product,
                  as: "products",
                },
              },
            ],
          });
      
          if (!productsRecommended) {
            return res.status(404).send("Categoría no encontrada");
          }
      
          const recommendedProducts = productsRecommended.subcategories
            .map((subcategory) => subcategory.products)
            .flat();
          let products = [];
          let orderProducts = []; 
          if (order) {
            orderProducts = order.orderProducts; 
            products = order.orderProducts.map((item) => {
              return {
                product: item.products,
                productQuantity: item.productQuantity,
                id: item.id
              };
            });
          }
      
          res.render("products/cart", {
            session: req.session,
            order,
            products,
            productsRecommended: recommendedProducts,
            formatNumber,
            orderProducts
          });
        } catch (error) {
          console.log(error);
        }
      },
    
      addToCart: async (req, res) => {
        try {
          const userID = req.session.user.id
          const { productID } = req.body;

          let order = await Order.findOne({
            where: {
              userID
            },
            include: [
              {
                model: OrderProduct,
                as: 'orderProducts',
                where: {
                  productID
                },
                required: false 
              }
            ]
          });        
      
          if (!order) {
            order = await Order.create({
              userID
            });
          }
      
          const existingProduct = order.orderProducts[0];
      
          if (existingProduct) {
            existingProduct.productQuantity += 1;
            await existingProduct.save();
          } else {
            await OrderProduct.create({
              orderID: order.id,
              productID,
              productQuantity: 1
            });
          }
      
          res.sendStatus(200);
        } catch (error) {
          console.log(error);
          res.sendStatus(500);
        }
      },      
      
      removeFromCart: async (req, res) => {
        try {
          const orderProductId = req.params.id;
      
          const orderProduct = await OrderProduct.findByPk(orderProductId);
      
          if (orderProduct) {
            await orderProduct.destroy();
          }
      
          res.redirect("/products/cart");
        } catch (error) {
          console.log(error);
        }
      },
      
      removeAllFromCart: async (req, res) => {
        try {
          const userID = req.session.user.id;
      
          const order = await Order.findOne({
            where: {
              userID
            }
          });
      
          if (order) {
            await OrderProduct.destroy({
              where: {
                orderID: order.id
              }
            });
          }
      
          res.redirect("/products/cart");
        } catch (error) {
          console.log(error);
        }
      },


    create: (req, res) => {
        const CATEGORIES_PROMISE = Category.findAll();
        const SUBCATEGORIES_PROMISE = Subcategory.findAll();
        const BRANDS_PROMISE = Brand.findAll();

        Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE, BRANDS_PROMISE])
            .then(([categories, subcategories, brands]) => {
                return res.render('products/productCreate', {
                    session: req.session,
                    brands,
                    categories,
                    subcategories,
                });
            })
            .catch((error) => console.log(error));
    },

    store: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const CATEGORIES_PROMISE = Category.findAll();
            const SUBCATEGORIES_PROMISE = Subcategory.findAll();
            const BRANDS_PROMISE = Brand.findAll();

            Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE, BRANDS_PROMISE])
                .then(([categories, subcategories, brands]) => {
                    return res.render('products/productCreate', {
                        session: req.session,
                        brands,
                        categories,
                        subcategories,
                        errors: errors.mapped(),
                        old: req.body,
                    });
                })
                .catch((error) => console.log(error));
        } else {
            const newProduct = {
                name: req.body.name,
                discount: +req.body.discount,
                price: +req.body.price,
                image: req.file ? req.file.filename : "default-image.png",
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
                cardSlot: +req.body.cardSlot,
                description: req.body.description,
            };

            Product.create(newProduct)
                .then((product) => {
                    Subcategory.findByPk(req.body.subcategoryID)
                        .then((subcategory) => {
                            subcategory.update({ categoriesID: req.body.category })
                                .then(() => console.log("Subcategoría actualizada con éxito"))
                                .catch((error) => console.log(error));
                        })
                        .catch((error) => console.log(error));

                    const files = req.files || [];
                    const images = files.map((file) => {
                        return {
                            image: file.filename,
                            productId: product.id,
                        };
                    });
                    const defaultImage = {
                        image: "default-image.png",
                        productId: product.id,
                    };

                    Product.update({ images: files.length ? images : [defaultImage] }, { where: { id: product.id } })
                        .then(() => {
                            return res.redirect('/products');
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        }
    },

    modify: (req, res) => {

        const productId = req.params.id;

        Product.findByPk(productId, {
            include: [
                {
                    association: "subcategories",
                    include: {
                        association: "categories",
                    }
                },
                {
                    association: "brands"
                }
            ]
        })
            .then((product) => {
                const categoriesPromise = Category.findAll();
                const subcategoriesPromise = Subcategory.findAll();

                Promise.all([categoriesPromise, subcategoriesPromise])
                    .then(([categories, subcagories]) => {
                        res.render("products/productModify", {
                            product,
                            formatNumber,
                            session: req.session
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        const errors = validationResult(req);
        const productId = Number(req.params.id);
    
        if (errors.isEmpty()) {
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
    
            Product.findByPk(productId, {
                include: [
                    {
                        association: "subcategories",
                        include: {
                            association: "categories",
                        },
                    },
                    {
                        association: "brands",
                    },
                ],
            })
                .then((product) => {
                    return product.update({
                        name,
                        discount,
                        price,
                        image: req.file ? req.file.filename : image,
                        subcategoryID: req.body.subCategory,
                        brandID: req.body.brand,
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
                    }, {
                        where: {
                            id: productId,
                        },
                    });
                })
                .then((product) => {
                    if (req.body.category) {
                        return product.update(
                            {
                                categoriesID: req.body.category,
                            },
                            {
                                where: {
                                    id: productId,
                                },
                            }
                        );
                    } else {
                        return product;
                    }
                })
                .then((product) => {
                    return res.redirect(`/products/${productId}`);
                })
                .catch(error => console.log(error));
        } else {
            const categoriesPromise = Category.findAll();
            const subcategoriesPromise = Subcategory.findAll();
    
            Promise.all([categoriesPromise, subcategoriesPromise])
                .then(([categories, subcategories]) => {
                    return res.render('products/productModify', {
                        session: req.session,
                        product: req.body,
                        categories,
                        subcategories,
                        errors: errors.array(),
                    });
                })
                .catch(error => next(error));
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
