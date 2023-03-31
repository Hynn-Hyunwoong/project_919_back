const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')

AWS.config.update({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region,
})

const s3 = new AWS.S3()

router.get('/signed-url/:filekey', async (req, res) => {
  try {
    const { fileKey } = req.params
    const params = {
      Bucket: config.s3.bucket,
      Key: fileKey,
      Expires: 60 * 1,
      ContentType: 'image/jpeg',
    }
    console.log(params, 'this is params in get signed url')
    const signedUrl = await s3.getSignedUrlPromise('getObject', params)
    res.json({ signedUrl })
  } catch (e) {
    console.error(e, 'error in get signed url')
    res.status(500).json({ error: e.message })
  }
})

router.post('/upload/userprofile', (req, res, next) => {
  const uploadProcess = upload.single('file')

  uploadProcess(req, res, (e) => {
    if (e) {
      console.log('error occurring in upload process')
      return res.status(500).json({ error: e.message })
    }
    res.status(200).json({ filePath: req.file.location })
  })
})

module.exports = router
