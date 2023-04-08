const express = require('express')
const router = express.Router()
const { recruitController: Controller } = require('./recruit.module')

//get
router.get('/getallrecruit', (req, res, next) =>
  Controller.getAllRecruit(req, res, next)
)

module.exports = router
