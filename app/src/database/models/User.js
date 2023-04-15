module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        userID:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        lastName: {
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        tel: {
            type: dataTypes.INTEGER(14),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
        rol: {
            type: dataTypes.STRING(14),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'products',
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
        const User = sequelize.define(alias, cols, config)
    User.associate = function (models) {
        User.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandID"
        })
    }
        return User
    }