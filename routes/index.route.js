const express = require('express')
const router = express.Router()

const image = require('./image.route')
const user = require('../src/user/user.route')
router.use('/image', image)
router.use('/user', user)

router.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' })
})

module.exports = router
