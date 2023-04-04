const {
  sequelize: { models },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const RecruitRepository = require('./recruit.repository')
const RecruitService = require('./recruit.service')
const RecruitController = require('./recruit.controller')

const recruitRepository = new RecruitRepository({ models })
const recruitService = new RecruitService({ recruitRepository })
const recruitController = new RecruitController({ recruitService })

module.exports = { recruitController }
