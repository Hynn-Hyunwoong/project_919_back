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
  recruitData,
  recruitCommentData,
  memberData,
  messageData,
} = require('./bulkdata/bulkdata.index')

const {
  models: {
    Board,
    BoardComment,
    Country,
    Currency,
    Member,
    Message,
    Recruit,
    RecruitComment,
    User,
    ottPlan,
    ottPlatform,
  },
} = sequelize

app.use((error, req, res, next) => {
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
    await Model.bulkCreate(data, {
      raw: true,
      ignoreDuplicates: true,
      updateOnDuplicate: Object.keys(Model.rawAttributes),
    })
    console.log(`${modelName} bulk data created.`)
  } catch (err) {
    console.error(`Error creating ${modelName} bulk data:`, err)
  }
}

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

const initializeData = async () => {
  await sequelize.sync({ force: true })
  await createBulkData(User, userData, 'User')
  await createBulkData(Country, countryData, 'Country')
  await createBulkData(Currency, currencyData, 'Currency')
  await createBulkData(ottPlatform, ottPlatformData, 'ottPlatforms')
  await createBulkData(ottPlan, await ottPlanData(), 'ottPlan')
  await createBulkData(Board, await boardData(), 'Board')
  await createBulkData(BoardComment, await boardCommentData(), 'BoardComment')
  await createBulkData(Recruit, await recruitData(), 'Recruit')
  await createBulkData(
    RecruitComment,
    await recruitCommentData(),
    'RecruitComment'
  )
  await createBulkData(Member, await memberData(), 'Member')
  await createBulkData(Message, await messageData(), 'Message')
  console.log(`Database is connected ${process.env.NODE_ENV}`)
}
initializeData()
