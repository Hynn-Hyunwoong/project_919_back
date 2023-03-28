const path = require('path')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})
const port = process.env.PORT || 'error'
const router = require('./routes/index')
const app = require('./app')
const { sequelize } = require('./models')
const axios = require('axios')
const Front = process.env.Front || 'error'
const crypto = require('crypto')
const SALT = process.env.SALT
const {
  userData,
  countryData,
  currencyData,
  ottPlatformData,
  ottPlanData,
  boardData,
  boardCommentData,
} = require('./bulkdata/bulkdata.index')

const {
  models: {
    Board,
    BoardComment,
    Chat,
    Country,
    Currency,
    Member,
    Message,
    Recruit,
    RecruitComment,
    User,
    ottPlan,
    ottPlatforms,
  },
} = sequelize

app.use((req, res, next, error) => {
  console.log(error, 'in server.js')
  res.status(500).send({ error })
})

app.get('/', (req, res, ext) => {
  res.send(
    `this is not available website, please click the This webpage ${Front}, 이 메시지는 확인용입니다. 2023-03-29`
  )
})

const createBulkData = async (Model, data, modelName) => {
  try {
    await Model.bulkCreate(data)
    console.log(`Bulk ${modelName} data created successfully`)
  } catch (e) {
    console.log(e, `This Error Occurring in ${modelName}.bulkCreate`)
  }
}

app.listen(port, async () => {
  console.log(`server is running on port ${port}`)
  await sequelize.sync({ force: true })
  await createBulkData(User, userData, 'User')
  await createBulkData(Country, countryData, 'Country')
  await createBulkData(Currency, currencyData, 'Currency')
  await createBulkData(ottPlatforms, ottPlatformData, 'ottPlatforms')
  await createBulkData(ottPlan, await ottPlanData, 'ottPlan')
  await createBulkData(Board, await boardData(), 'Board')
  await createBulkData(BoardComment, await boardCommentData(), 'BoardComment')
  console.log(`database is connected ${process.env.NODE_ENV}`)
})
