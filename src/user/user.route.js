const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const authenticateToken = require('../../middleware/authenticateToken')

const { userController: Controller } = require('./user.module')

router.get('/getinfo', authenticateToken, (req, res, next) =>
  Controller.getUserInfo(req, res, next)
)

router.post('/checkuserId', (req, res, next) =>
  Controller.userIdChecker(req, res, next)
)
router.post('/useradd', (req, res, next) => Controller.userAdd(req, res, next))
router.post('/checkphone', (req, res, next) =>
  Controller.checkPhone(req, res, next)
)
router.post('/login', (req, res, next) => Controller.userLogin(req, res, next))

router.put('/update', authenticateToken, (req, res, next) =>
  Controller.userUpdate(req, res, next)
)

module.exports = router
