module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(11),
            allowNull: false,
        },
        }
        let config = {
            tableName: 'categories',
            timestamps: false
        };
        const Category = sequelize.define(alias, cols, config)
    Category.associate = function (models) {
        Category.hasMany(models.Subcategory, {
            as: "subcategories",
            foreignKey: "categoriesID"
        })
    }
        return Category
    }