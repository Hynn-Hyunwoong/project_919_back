const express = require('express')
const router = express.Router()
const user = require('../src/user/user.route')
const aws = require('../src/aws/aws.route')

router.use('/user', user)
router.use('/aws', aws)

module.exports = router
