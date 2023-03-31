const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const config = require('../config')

const s3 = new AWS.S3({
  region: config.s3.region,
  signatureVersion: config.s3.signatureVersion,
  credentials: {
    accessKeyId: config.s3.accessKeyID,
    secretAccessKey: config.s3.secretAccessKey,
  },
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3.bucketName,
    acl: config.s3.acl,
    key: function (req, file, cb) {
      const fileName =
        (req.customPath || 'unknown') +
        '/' +
        Date.now() +
        '_' +
        file.originalname
      cb(null, fileName)
    },
  }),
})

module.exports = upload
