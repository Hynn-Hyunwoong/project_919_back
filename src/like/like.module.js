const {
  sequelize: {
    models: { Like },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const LikeRepository = require('./like.repository')
const LikeService = require('./like.service')
const LikeController = require('./like.controller')

const likeRepository = new LikeRepository({ Like, sequelize, Sequelize })
const likeService = new LikeService({ likeRepository })
const likeController = new LikeController({ likeService })

module.exports = { likeController }
