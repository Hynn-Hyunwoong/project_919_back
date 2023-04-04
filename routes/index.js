const express = require('express')
const router = express.Router()
const user = require('../src/user/user.route')
const aws = require('../src/aws/aws.route')
const recruit = require('../src/recruit/recruit.route')

router.use('/user', user)
router.use('/aws', aws)
router.use('/recruit', recruit)

module.exports = router
