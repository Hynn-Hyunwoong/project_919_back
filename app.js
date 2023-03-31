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
app.use((req, res, next, error) => {
  const statusCode = error.statusCode || 500
  if (statusCode >= 400) {
    console.log(error.message, 'In app.js')
    return res.status(statusCode).send({ error })
  }
  res.status(500).send(error.message)
})

module.exports = app
