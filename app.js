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

const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
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

app.get('/signed-url/', async (req, res) => {
  try {
    const signedUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'project919files/train.jpeg',
      Expires: 60 * 60,
    })
    res.json({ signedUrl })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
})

module.exports = app
