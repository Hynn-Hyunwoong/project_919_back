const express = require('express')
const router = express.Router()
const { likeController: Controller } = require('./like.module')

router.get('/getlike/:recruitIndex', (req, res, next) =>
  Controller.getLikeCount(req, res, next)
)

router.get('/getuserlike/:userIndex', (req, res, next) =>
  Controller.getUserLike(req, res, next)
)

router.post('/clicklike', (req, res, next) =>
  Controller.clickLike(req, res, next)
)

module.exports = router
