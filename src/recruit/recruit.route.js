const express = require('express')
const router = express.Router()

const { recruitController: Controller } = require('./recruit.module')

// 게시글 insert
router.post('/write', (req, res, next) =>
  Controller.postContent(req, res, next)
)

// 플랫폼&플랜 불러오기!!!!
router.get('/write', (req, res, next) => Controller.getWrite(req, res, next))
router.post('/write/plan', (req, res, next) =>
  Controller.postPlan(req, res, next)
)

router.get('/view/:id', (req, res, next) => Controller.getView(req, res, next))
router.post('/view/:id', (req, res, next) =>
  Controller.addMember(req, res, next)
)

router.get('/list', (req, res, next) => Controller.getList(req, res, next))

// router.get('/getinfo', authenticateToken, (req, res, next) =>
//   Controller.getUserInfo(req, res, next)
// )

module.exports = router
