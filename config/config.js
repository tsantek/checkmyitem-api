// dotenv init
require('dotenv').config();

module.exports = {
    connectionString: process.env.CONNECTION_STRING,
    databaseUrl: process.env.DB_URL,
    databasePort: process.env.DB_PORT,
    databaseUser: process.env.DB_USER,
    databasePassword: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE,
    databaseUrlProduction: process.env.DB_URL_PRODUCTION,
    jwtToken_: process.env.JWT_TOKEN,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}