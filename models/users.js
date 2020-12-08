module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            required: true
        },
        username: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        country: {
            type: DataTypes.STRING,
            required: true
        },
        address: {
            type: DataTypes.STRING,
            required: false
        },
        organization: {
            type: DataTypes.BOOLEAN,
            required: false
        },
        repairShop: {
            type: DataTypes.BOOLEAN,
            required: false
        },
        password: {
            type: DataTypes.STRING,
            required: true
        }
    }, {
        underscored: true
    });

    return User;
};