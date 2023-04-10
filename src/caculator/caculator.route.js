const express = require('express')
const router = express.Router()
const { caculatorController: Controller } = require('./caculator.module')

// get
router.get('/gettype/:platformName', (req, res, next) =>
  Controller.getOttPlanByPlatform(req, res, next)
)
router.get('/getprice/:ottPlanIndex', (req, res, next) =>
  Controller.getConvertedPrice(req, res, next)
)

module.exports = router
