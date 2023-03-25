const dotenv = require('dotenv').config()
const port = process.env.PORT || 'error'
const router = require('./routes/index')
const app = require('./app')
const { sequelize } = require('./models')
const axios = require('axios')
// const JWT = require('./lib/jwt')
const crypto = require('crypto')
const SALT = process.env.SALT
// const SocketIO = require('./routes/socket.io')
// const jwt = new JWT({ crypto })

// app.use(router)
app.use((req, res, next, error) => {
  console.log(error, 'in server.js')
  res.status(500).send({ error })
})

app.listen(port, async () => {
  console.log(`server is running on port ${port}`)
  await sequelize.sync({ force: true })
  console.log('database is connected')
})
