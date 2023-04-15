module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        buyDate: {
            type: dataTypes.DATE,
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        finalQuantity: {
            type: dataTypes.INTEGER(20),
            allowNull: false,
        },
        finalPrice: {
            type: dataTypes.INTEGER(20),
            allowNull: false,
        },
    }

    let config = {
        tableName: "orders",
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = function (models) {
        Order.hasMany(models.OrderProduct, {
            as: "orders_products",
            foreignKey: "orderID"
        });
        Order.belongsTo(models.user, {
            as: "users",
            foreignKey: "userID"
        });
    }

    return Order;
}