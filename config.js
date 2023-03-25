const path = require('path')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})
const config = {
  db: {
    development: {
      database: process.env.DB_DATABASE_TEST || '456',
      username: process.env.DB_USER || 'error',
      password: process.env.DB_PASSWORD || 'error',
      host: process.env.DB_HOST || 'error',
      port: process.env.DB_PORT || 'error',
      dialect: process.env.DB_DIALECT || 'error',
      define: {
        freezeTableName: true,
        timestamps: true,
      },
      timezone: 'Asia/Seoul',
      dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
      },
    },

    production: {
      database: process.env.DB_DATABASE || '123',
      username: process.env.DB_USER || 'error',
      password: process.env.DB_PASSWORD || 'error',
      host: process.env.DB_HOST || 'error',
      port: process.env.DB_PORT || 'error',
      dialect: process.env.DB_DIALECT || 'error',
      define: {
        freezeTableName: true,
        timestamps: true,
      },
      timezone: 'Asia/Seoul',
      dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
      },
    },
  },
}
module.exports = config
