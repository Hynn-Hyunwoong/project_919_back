const express = require('express')
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const axios = require('axios')
const crypto = require('crypto')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})

app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  console.log(error.message, 'in app.js')
  res.status(statusCode).send({ message: error.message })
})

module.exports = app
