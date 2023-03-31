const dotenv = require('dotenv').config({ path: '../../.env' })
const SALT = process.env.SALT || 'error'

class userService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository
    this.jwt = jwt
    this.crypto = require('crypto')
  }
  // User가입
  async userAdd({
    userId,
    userPw,
    userNick,
    phone,
    filename: picture,
    verified,
    phoneVerificationCode,
    phoneVerificationExpiry,
  }) {
    try {
      const hash = this.crypto
        .createHmac('sha256', SALT)
        .update(userPw)
        .digest('hex')
      const user = await this.userRepository.userAdd({
        userId,
        userPw: hash,
        userNick,
        phone,
        picture,
        verified,
        phoneVerificationCode,
        phoneVerificationExpiry,
      })
      return user
    } catch (e) {
      console.log(`This error occurring in Service in userAdd method: ${e}`)
      throw new Error(e)
    }
  }

  // ID 중복 체크
  async userIdChecker({ userId }) {
    try {
      const user = await this.userRepository.userIdChecker({ userId })
      return user ? { isAvailable: false } : { isAvailable: true }
    } catch (e) {
      console.log(
        `This error occurring in Service in userIdChecker method: ${e}`
      )
      throw new Error(e)
    }
  }
  // Phone 중복 체크
  async checkPhone({ phone }) {
    try {
      const user = await this.userRepository.checkPhone({ phone })
      return user ? { isAvailable: false } : { isAvailable: true }
    } catch (e) {
      console.log(`This error occurring in Service in checkPhone method: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = userService
