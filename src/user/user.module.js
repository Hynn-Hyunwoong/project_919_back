const {
  sequelize: {
    models: { User, Recruit },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const UserRepository = require('./user.repository')
const UserService = require('./user.service')
const UserController = require('./user.controller')
const JWT = require('../../lib/jwt')
const crypto = require('crypto')

const jwt = new JWT({ crypto })

const userRepository = new UserRepository({
  User,
  sequelize,
  Sequelize,
  Recruit,
})
const userService = new UserService({ userRepository, jwt })
const userController = new UserController({ userService })

module.exports = { userController }
