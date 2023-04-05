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
    AccessKeyID: process.env.AWS_ACCESS_KEY,
    SecretAccessKey: process.env.AWS_SECRET_KEY,
    Region: 'ap-northeast-2',
    BucketName: process.env.AWS_BUCKET_NAME,
    ACL: 'private',
  },
  sens: {
    AccessKeyID: process.env.naverAccessKey,
    SecretAccessKey: process.env.naverSecretKey,
    serviceId: process.env.naverSENSServiceID,
    sendUrl: process.env.naverSENSsendURL,
    from: process.env.naverSENSNumber,
  },
  naver: {
    clientId: process.env.naverClientID,
    clientSecret: process.env.naverClientSecret,
    callbackUrl: process.env.naverCallbackURL,
  },
  SALT: {
    SALT: process.env.SALT,
  },
  kakao: {
    ClientKey: process.env.kakaoRESTAPIKEY,
    SecretKey: process.env.kakaoCLIENTSECRETKEY,
    CallbackURL: process.env.kakaoCALLBACKURL,
  },
}
module.exports = config
