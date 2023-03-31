const express = require('express')
const router = express.Router()
const upload = require('../../lib/multer')
console.log(upload)

const { userController: Controller } = require('./user.module')

router.post('/checkuserId', (req, res, next) =>
  Controller.userIdChecker(req, res, next)
)
router.post('/useradd', (req, res, next) => Controller.userAdd(req, res, next))
router.post('/checkphone', (req, res, next) =>
  Controller.checkPhone(req, res, next)
)

module.exports = router
