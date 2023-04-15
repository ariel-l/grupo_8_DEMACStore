module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
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