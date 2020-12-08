const dbConfig = require("../config/config.js")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.databaseName, dbConfig.databaseUser, dbConfig.databasePassword, {
    host: dbConfig.databaseUrl,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//Models/tables
db.Users = require('./users.js')(sequelize, Sequelize)
db.Items = require('./items.js')(sequelize, Sequelize)
db.Owners = require('./owners.js')(sequelize, Sequelize)
db.Timelines = require('./timelines.js')(sequelize, Sequelize)
db.Sales = require('./sales.js')(sequelize, Sequelize)

//Models/tables
db.Users.hasMany(db.Owners);
db.Items.hasMany(db.Owners);
db.Users.hasMany(db.Sales);
db.Items.hasMany(db.Sales);
db.Users.hasMany(db.Timelines);
db.Items.hasMany(db.Timelines);


module.exports = db