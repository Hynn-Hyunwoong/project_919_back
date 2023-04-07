const express = require('express')
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const axios = require('axios')
const crypto = require('crypto')
const JWT = require('./lib/jwt')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})
const SALT = process.env.SALT
const allowURL = process.env.AXIOS_DOMAIN
const passport = require('passport')
const { sequelize } = require('./models')
require('./src/auth/auth.sns.controller')
const jwt = new JWT({ crypto })
const {
  models: { User },
} = sequelize

const allowedOrigins = [
  'https://localhost:3000',
  'https://127.0.0.1:3000',
  'https://www.hynn.kr',
  'https://127.0.0.1:3005',
  'https://localhost:3005',
]

app.use(cookieParser())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '50mb' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(passport.initialize())
app.use(async (req, res, next) => {
  const token = req.cookies.token
  if (token) {
    try {
      const decode = jwt.Verify(token, SALT)
      req.user = await User.findOne({ where: { userId: decode.userId } })
    } catch (e) {
      console.log('Invalid Token', e)
    }
  }
  next()
})
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  console.log(error.message, 'in app.js')
  res.status(statusCode).send({ message: error.message })
})

module.exports = app
