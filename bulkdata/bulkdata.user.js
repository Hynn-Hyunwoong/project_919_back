const dotenv = require('dotenv').config({ path: '../.env' })
const SALT = process.env.SALT
const password = '12341234'
const crypto = require('crypto')

const hash = crypto.createHmac('sha256', SALT).update(password).digest('hex')

const userData = []
for (let i = 01; i <= 20; i++) {
  userData.push({
    userId: `user${i}@.user.com`,
    userPw: hash,
    userNick: `userNick${i}`,
    phone: `0101234123${i}`,
    verified: true,
    picture: null,
    phoneVerificationCode: null,
    phoneVerificationExpiry: null,
  })
}

module.exports = userData
