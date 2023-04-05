const express = require('express')
const router = express.Router()

const { recruitController: Controller } = require('./recruit.module')

router.post('/write', (req, res, next) => {
  console.log(req.body)
})
router.get('/write', (req, res, next) => Controller.getWrite(req, res, next))

router.post('/write/plan', (req, res, next) =>
  Controller.postPlan(req, res, next)
)

// router.get('/getinfo', authenticateToken, (req, res, next) =>
//   Controller.getUserInfo(req, res, next)
// )

module.exports = router
