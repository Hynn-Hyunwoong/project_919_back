const {
  sequelize: {
    models: {
      Recruit,
      User,
      Like,
      ottPlatform,
      ottPlan,
      Currency,
      Country,
      Member,
    },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const RecruitRepository = require('./recruit.repository')
const RecruitService = require('./recruit.service')
const RecruitController = require('./recruit.controller')

const recruitRepository = new RecruitRepository({
  Recruit,
  User,
  Like,
  ottPlatform,
  ottPlan,
  Currency,
  Country,
  Member,
  sequelize,
  Sequelize,
})
const recruitService = new RecruitService({ recruitRepository })
const recruitController = new RecruitController({ recruitService })

module.exports = { recruitController }
