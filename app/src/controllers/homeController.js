const { Product, Sequelize, sequelize, Subcategory, Category} = require("../database/models");
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
  index: async (req, res) => {
    try {
      const productsInSale = await Product.findAll({
        where: {
          discount: {
            [Op.gte]: 0,
          },
        },
        order: sequelize.literal('RAND()'),
      });

      const productsRecommended = await Category.findByPk(2, {
        include: [
          {
            model: Subcategory,
            as: 'subcategories',
            include: {
              model: Product,
              as: 'products',
            },
          },
        ],
      });
      
      if (!productsRecommended) {
        return res.status(404).send('Categoría no encontrada');
      }
      
      const recommendedProducts = productsRecommended.subcategories
        .map((subcategory) => subcategory.products)
        .flat();

      const products = await Product.findAll({
        include: [
          {
            association: 'subcategories',
            include: {
              association: 'categories',
            },
          },
        ],
      });

      return res.render('home', {
        productsInSale,
        productsRecommended: recommendedProducts,
        products,
        formatNumber,
        session: req.session,
      });
    } catch (error) {
      console.log(error);
    }
  },

    search: async (req, res) => {
        const { keywords } = req.query;
        const toLowerAndArray = (string) => string.toLowerCase().split(' ');
        const findWord = array => array.some((word) => keywords.toLowerCase().includes(word));

        try {
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keywords}%`
                    }
                 }
            });

            const filteredProducts = products.filter((product) =>
                findWord(toLowerAndArray(product.name))
            );

            const results = shuffle(filteredProducts);
            res.render('results', {
                products,
                keywords,
                results,
                formatNumber,
                session: req.session,
            });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}