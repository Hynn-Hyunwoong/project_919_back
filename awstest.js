const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northest-2' })
const s3 = new AWS.S3()
