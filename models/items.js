module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('items', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        serial: {
            type: DataTypes.STRING,
            required: true
        },
        status: {
            type: DataTypes.STRING,
            required: true
        },
        description: {
            type: DataTypes.TEXT,
            required: true
        },
        stolen: {
            type: DataTypes.BOOLEAN,
            required: true
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        underscored: true
    });
    return Items;
};