module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        address: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        postal_code: {
            type: dataTypes.INTEGER(4),
            allowNull: false,
        },
        province: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        city: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    }

    let config = {
        tableName: "addresses",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }

    const Address = sequelize.define(alias, cols, config);
    Address.associate = function (models) {
        Address.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    }
    return Address;
}