const express = require('express')
const router = express.Router()
const user = require('../src/user/user.route')
const aws = require('../src/aws/aws.route')
const recruit = require('../src/recruit/recruit.route')
const sms = require('../src/api/naver/sens.route')
const authRoutes = require('../src/auth/auth.sns.route')
const like = require('../src/like/like.route')

router.use('/user', user)
router.use('/aws', aws)
router.use('/recruit', recruit)
router.use('/api', sms)
router.use('/like', like)
router.use(authRoutes)

module.exports = router
