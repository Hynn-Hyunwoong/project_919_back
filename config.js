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
  s3: {
    accessKeyID: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
    bucketName: process.env.AWS_BUCKET_NAME,
    acl: 'private',
  },
}
module.exports = config
