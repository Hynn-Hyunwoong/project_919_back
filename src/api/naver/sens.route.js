const express = require('express')
const router = express.Router()
const { SMSVerification } = require('./sens.controller')
const smsVerificationInstance = new SMSVerification()

router.post('/sendsms', (req, res) =>
  smsVerificationInstance.sendVerificationSMS(req, res)
)

router.post('/verifycode', (req, res) =>
  smsVerificationInstance.verifyUser(req, res)
)

router.get('/messageid/:requestId', (req, res) =>
  smsVerificationInstance.getMessageId(req, res)
)

router.get('/messagecontent/:messageId', (req, res) =>
  smsVerificationInstance.getMessageContent(req, res)
)

module.exports = router
