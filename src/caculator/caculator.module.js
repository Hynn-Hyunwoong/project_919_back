const {
  sequelize: {
    models: { ottPlatform, ottPlan, Currency, Country },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const CaculatorRepository = require('./caculator.repository')
const CaculatorService = require('./caculator.service')
const CaculatorController = require('./caculator.controller')

const caculatorRepository = new CaculatorRepository({
  ottPlatform,
  ottPlan,
  Currency,
  Country,
  sequelize,
  Sequelize,
})
const caculatorService = new CaculatorService({ caculatorRepository })
const caculatorController = new CaculatorController({ caculatorService })

module.exports = { caculatorController }
