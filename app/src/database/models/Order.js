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
        userID: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        finalQuantity: {
            type: dataTypes.INTEGER(20),
            allowNull: true,
        },
        finalPrice: {
            type: dataTypes.INTEGER(20),
            allowNull: true,
        },
    }

    let config = {
        tableName: "orders",
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = function (models) {
        Order.hasMany(models.OrderProduct, {
            as: "orderProducts",
            foreignKey: "orderID"
        });
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey: "userID"
        });
    }    

    return Order;
}