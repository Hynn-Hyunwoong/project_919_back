const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config').s3
const { AWSs3 } = require('../src/AWS/aws.model')

const upload = multer({
  storage: multerS3({
    s3: AWSs3,
    bucket: config.BucketName,
    ACL: config.ACL,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      const filename = Date.now() + '-' + file.originalname
      cb(null, 'project919files/' + filename)
    },
  }),
})

module.exports = upload
