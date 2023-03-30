const dotenv = require('dotenv').config({ path: '../../.env' })
const SALT = process.env.SALT || 'error'

class userService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository
    this.jwt = jwt
    this.crypto = require('crypto')
  }
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
}

module.exports = userService
