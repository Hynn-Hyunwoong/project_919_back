const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})
const httpport = process.env.HTTPPORT || 'error'
const httpsport = process.env.HTTPSPORT || 'error'
const app = require('./app')
const router = require('./routes')
const { sequelize } = require('./models')
const https = require('https')
const http = require('http')
const schedule = require('node-schedule')
const todayCurrencyUpdate = require('./src/api/exchange/exchange.run')

app.use('/', router)

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
    Like,
  },
} = sequelize

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

const useHttps = process.env.USE_HTTPS === 'true'

if (useHttps) {
  const privateKey = fs.readFileSync('key.pem', 'utf8')
  const certificate = fs.readFileSync('cert.pem', 'utf8')
  const credentials = { key: privateKey, cert: certificate }
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(httpsport, () => {
    console.log(`HTTPS server is running on port ${httpsport}`)
  })
} else {
  const httpServer = http.createServer(app)
  httpServer.listen(httpport, () => {
    console.log(`HTTP server is running on port ${httpport}`)
  })
}

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
  console.log(
    `Database is connected ${process.env.NODE_ENV}, HTTPS:${process.env.USE_HTTPS}`
  )
  console.log('Scheduled Jobs:')
  for (const jobName of Object.keys(schedule.scheduledJobs)) {
    console.log(
      `- ${jobName}`,
      schedule.scheduledJobs[jobName].nextInvocation()
    )
  }
}
initializeData()
