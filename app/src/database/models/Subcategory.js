module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";
    let cols = {
        subcategoryID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        subcategoryName: {
            type: dataTypes.STRING(10),
            allowNull: false,
        },
        categoriesID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'subcategories',
        timestamps: false
    }
        
    const Subcategory = sequelize.define(alias, cols, config);
    Subcategory.associate = (models) => {
        Subcategory.belognsTo(models.categories, {
            as:"categories",
            foreignKey: "categoriesID"
        }),
    Subcategory.associate = function (models) {
        Subcategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategoryID"
        })
    }
    }
    return Subcategory
    }
