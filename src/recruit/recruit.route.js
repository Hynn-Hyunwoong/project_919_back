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
router.get('/getallrecruit/:platformName', (req, res, next) =>
  Controller.getAllRecruit(req, res, next)
)

module.exports = router
