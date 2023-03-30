const express = require('express')
const router = express.Router()

const { userController: Controller } = require('./user.module')

router.post('/checkuserId', (req, res, next) =>
  Controller.userIdChecker(req, res, next)
)

module.exports = router
