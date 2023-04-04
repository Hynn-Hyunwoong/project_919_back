const express = require('express')
const router = express.Router()
const awsController = require('./aws.controller')

router.get('/signedurl/project919files', awsController.getSignedUrl)
router.post('/upload', awsController.uploadFile)
router.get('/download/project919files/:filename', awsController.downloadFile)
router.delete('/delete/project919files/:filename', awsController.deleteFile)

module.exports = router
