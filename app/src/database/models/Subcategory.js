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
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        categoriesID: {
            type: dataTypes.INTEGER(11),
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
    }
    let config = {
        tableName: 'subcategories',
    }

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = (models) => {
        Subcategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategoryID"
        });
        Subcategory.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "categoriesID"
        });

    }

    return Subcategory;
}
