const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config')['db'][env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('model') !== -1)
  .map((file) => {
    try {
      require(path.join(__dirname, file))(sequelize, Sequelize)
    } catch (e) {
      console.log(
        `문제가 발생했습니다. 모델을 정의할 수 없습니다. Model/index.js를 확인하세요. file : ${file}. Error: ${e}`
      )
    }
  })

const { models } = sequelize
for (const key in models) {
  if (typeof models[key].associate !== 'function') continue
  models[key].associate(models)
}

module.exports = { sequelize, Sequelize }
