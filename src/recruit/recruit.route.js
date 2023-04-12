const express = require('express')
const router = express.Router()
const { recruitController: Controller } = require('./recruit.module')

/* Get List */
// 전체게시물
router.get('/getallrecruit', (req, res, next) =>
  Controller.getAllRecruit(req, res, next)
)
// 특정게시물
router.get('/getonerecruit/:recruitIndex', (req, res, next) =>
  Controller.getOneRecruit(req, res, next)
)
// Hidden 게시물
router.get('/gethiddenrecruit/:hidden', (req, res, next) =>
  Controller.getHiddenRecruit(req, res, next)
)
//Platform 게시물
router.get('/getplatformrecruit/:platformName', (req, res, next) =>
  Controller.getPlatformRecruit(req, res, next)
)

router.get('/checkmember/:userIndex', (req, res, next) =>
  Controller.checkMember(req, res, next)
)

/* Post List */
// 게시물 등록
router.post('/createrecruit', (req, res, next) =>
  Controller.createRecruit(req, res, next)
)

router.post('/joinmember', (req, res, next) =>
  Controller.joinMember(req, res, next)
)

module.exports = router
