// Update with your config settings.
require('dotenv').config({ path: '.env' })


module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_URL,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_URL_PRODUCTION,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'knex_migrations'
    }
  }

};
