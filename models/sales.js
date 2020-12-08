module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('sales', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        item_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        underscored: true
    });
    return Sales;
};