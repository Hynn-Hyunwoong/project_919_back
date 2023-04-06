const {
  sequelize: {
    models: { User, ottPlatform, ottPlan, Recruit, Country, Member, Currency },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const RecruitRepository = require('./recruit.repository')
const RecruitService = require('./recruit.service')
const RecruitController = require('./recruit.controller')

const recruitRepository = new RecruitRepository({
  User,
  ottPlatform,
  ottPlan,
  Recruit,
  Country,
  Member,
  Currency,
  sequelize,
  Sequelize,
})
const recruitService = new RecruitService({ recruitRepository })
const recruitController = new RecruitController({ recruitService })

module.exports = { recruitController }
