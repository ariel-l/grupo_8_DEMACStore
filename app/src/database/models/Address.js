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
            type: dataTypes.SRING(45),
            allowNull: false,
        },
        postal_code: {
            type: dataTypes.INTEGER(4),
            allowNull: false,
        },
        province: {
            type: dataTypes.SRING(40),
            allowNull: false,
        },
        city: {
            type: dataTypes.SRING(40),
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
    /*    Address.hasMany(models.User, {
            as: "users",
            foreignKey: ""
        })*/
        Address.belongsTo(models.User, {
            as: "users",
            foreignKey: "userID"
    })
    }
    return Address;
}