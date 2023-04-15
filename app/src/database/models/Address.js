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
        }
    }

    let config = {
        tableName: "addresses",
    }

    const Address = sequelize.define(alias, cols, config);
    Address.associate = function (models) {
        Address.belongsTo(models.User, {
            as: "users",
            foreignKey: "userId"
        })
    }
    return Address;
}