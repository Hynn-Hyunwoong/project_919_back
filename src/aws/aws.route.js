const express = require('express')
const router = express.Router()
const awsController = require('./aws.controller')

router.post('/upload', awsController.uploadFile)
router.get('/download/*', awsController.downloadFile)
router.delete('/delete/:filename', awsController.deleteFile)

module.exports = router
