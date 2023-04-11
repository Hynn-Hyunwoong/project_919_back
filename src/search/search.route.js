const express = require('express')
const router = express.Router()
const { searchController: Controller } = require('./search.module')

/* Get List */
// router.get('/getallrecruit', (req, res, next) =>
//   Controller.getAllRecruit(req, res, next)
// )
router.get('/:id', (req, res, next) => {
  console.log(req.params)
  res.json(req.params)
})

module.exports = router
