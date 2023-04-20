module.exports = (sequelize, dataTypes) => {
    let alias = "OrderProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        orderID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        productID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        productQuantity: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
     }

    let config = {
        tableName: "order_products",
    }

    const OrderProduct = sequelize.define(alias, cols, config)

    OrderProduct.associate = function (models) {
        OrderProduct.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "orderID"
        });
        OrderProduct.belongsTo(models.Product, {
            as: "products",
            foreignKey: "productID"
        });
    }
    return OrderProduct;
}