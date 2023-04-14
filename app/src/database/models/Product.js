module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(100),
        },
        brandID: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(11),
        },
        subcategoryID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        model: {
            type: dataTypes.STRING(40),
        },
        os: {
            type: dataTypes.STRING(20),
        },
        screen: {
            type: dataTypes.STRING(20),
        },
        internalMemory: {
            type: dataTypes.STRING(20),
        },
        ram: {
            type: dataTypes.STRING(20),
        },
        chipset: {
            type: dataTypes.STRING(20),
        },
        frontCamera: {
            type: dataTypes.STRING(20),
        },
        mainCamera: {
            type: dataTypes.STRING(20),
        },
        video: {
            type: dataTypes.STRING(100),
        },
        battery: {
            type: dataTypes.STRING(45),
        },
        dimensions: {
            type: dataTypes.STRING(100),
        },
        weight: {
            type: dataTypes.STRING(20),
        },
        cardSlot: {
            type: dataTypes.STRING(20),
        },
        description: {
            type: dataTypes.STRING(450),
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    }

    let config = {
           tableName: 'products',
        // createdAt: "createdAt",
        // updatedAt: "updatedAt",
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
         Product.belongsTo(models.subcategoryID, {
             as: "subcategories",
             foreignKey: "subcategoryID"
         })
         Product.belongsTo(models.brandID, {
             as: "brands",
             foreignKey: "brandID"
         })
        }

    return Product;
}