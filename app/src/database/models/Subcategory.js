module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(15),
            allowNull: false,
        },
        categoriesID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'subcategories',
        c
    }

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = (models) => {
        Subcategory.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoriesID"
        });
        Subcategory.belongsTo(models.Product, {
            as: "products",
            foreignKey: "subcategoryID"
        });
        Subcategory.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brandID"
        });
    }

    return Subcategory;
}
