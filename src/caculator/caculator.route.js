const express = require('express')
const router = express.Router()
const { caculatorController: Controller } = require('./caculator.module')

// get
router.get('/getHolePlatform', (req, res, next) =>
  Controller.getHolePlatform(req, res, next)
)

router.get(
  '/gettype/:platformName',
  (req, res, next) => Controller.getOttPlanByPlatform(req, res, next)
  // 디비에 저장된 플랫폼 이름으로
)
router.get(
  '/getprice/:ottPlanIndex',
  (req, res, next) => Controller.getConvertedPrice(req, res, next)
  // 금액만
)

module.exports = router
