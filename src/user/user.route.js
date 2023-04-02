const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const authenticateToken = require('../../middleware/authenticateToken')

const { userController: Controller } = require('./user.module')

// get
router.get('/getinfo', authenticateToken, (req, res, next) =>
  Controller.getUserInfo(req, res, next)
)
router.get('/getprofilepicture', authenticateToken, (req, res, next) =>
  Controller.getProfilePicture(req, res, next)
)

//post
router.post('/checkuserId', (req, res, next) =>
  Controller.userIdChecker(req, res, next)
)
router.post('/checkphone', (req, res, next) =>
  Controller.checkPhone(req, res, next)
)
router.post('/useradd', upload.single('picture'), (req, res, next) =>
  Controller.userAdd(req, res, next)
)
router.post('/login', (req, res, next) => Controller.userLogin(req, res, next))

//put
router.put(
  '/update',
  authenticateToken,
  upload.single('picture'),
  (req, res, next) => Controller.userUpdate(req, res, next)
)

//delete

module.exports = router
