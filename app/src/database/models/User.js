module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id:{
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
        },
        lastName: {
            type: dataTypes.STRING(40),
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: dataTypes.INTEGER(14),
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
        role: {
            type: dataTypes.STRING(14),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'users',
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
        const User = sequelize.define(alias, cols, config)
        User.associate = function (models) {
            User.hasOne(models.Address, {
                as: 'address',
                foreignKey: 'userId'
            })
        }
        return User
    }