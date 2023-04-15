module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
        brandID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        brand: {
            type: dataTypes.string(20),
            allowNull: false,
        },
    }

    let config = {
        tableName: "brands",
        timestamps: false,
    }

    const Brand = sequelize.define(alias, cols, config);
    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandID"
        })
    }
    return Brand;
}