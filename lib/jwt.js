const crypto = require('crypto')
const dotenv = require('dotenv').config({ path: '../.env' })
const SALT = process.env.SALT || 'error'

class JWT {
  constructor({ crypto }) {
    this.crypto = crypto
  }

  Sign(data, secret, options = {}) {
    try {
      const header = this.encode({ alg: 'HS256', typ: 'JWT' })
      const payloadData = { ...data }
      if (options.expiresIn) {
        const currentTime = Math.floor(Date.now() / 1000)
        payloadData.exp = currentTime + options.expiresIn
      }
      const payload = this.encode(payloadData)
      const signature = this.createSignature([header, payload], secret)
      return [header, payload, signature].join('.')
    } catch (e) {
      console.log(`This Error occurring in JWT Sign method: ${e}`)
      throw new Error(e)
    }
  }
  Verify(token, SALT) {
    try {
      const [header, payload, signature] = token.split('.')
      const newSignature = this.createSignature([header, payload], SALT)
      if (newSignature !== signature) {
        console.log(SALT, `This Console Log is SALT from JWT.js`)
        console.log(`Original signature: ${signature}`)
        console.log(`New signature: ${newSignature}`)
        console.log(`Header : ${header}`)
        console.log(`Token: ${token}`)
        throw new Error('The error occurring in Verify method by Token')
      }

      return this.decode(payload)
    } catch (e) {
      console.log(`This error occurring in JWT Verify method: ${e}`)
      throw new Error(e)
    }
  }

  encode(obj) {
    try {
      return Buffer.from(JSON.stringify(obj)).toString('base64url')
    } catch (e) {
      console.log(`This error occurring in JWT encode method: ${e}`)
      throw new Error(e)
    }
  }
  decode(base64url) {
    try {
      return JSON.parse(Buffer.from(base64url, 'base64url').toString('utf8'))
    } catch (e) {
      console.log(`This error occurring in JWT decode method: ${e}`)
      throw new Error(e)
    }
  }
  createSignature(base64urls, salt = SALT) {
    try {
      const data = base64urls.join('.')
      return this.crypto
        .createHmac('sha256', salt)
        .update(data)
        .digest('base64url')
    } catch (e) {
      console.log(`This error occurring in JWT createSignature method: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = JWT
