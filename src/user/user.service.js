const dotenv = require('dotenv').config({ path: '../../.env' })
const SALT = process.env.SALT || 'error'

class userService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository
    this.jwt = jwt
    this.crypto = require('crypto')
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
  // User 로그인
  async userLogin({ userId, userPw }) {
    try {
      const hash = this.crypto
        .createHmac('sha256', SALT)
        .update(userPw)
        .digest('hex')
      const user = await this.userRepository.userLogin({ userId, userPw: hash })
      if (!user) {
        console.log(
          'This user not fount in userLogin method for user.service.js'
        )
        throw new Error('User not found')
      }
      const token = this.jwt.Sign({ userId: user.userId }, SALT, {
        expiresIn: 30 * 60,
      })
      return { token, user }
    } catch (e) {
      console.log(`This error occurring in Service in userLogin method: ${e}`)
      throw new Error(e)
    }
  }

  // User 정보 불러오기
  async getUserInfo({ userId }) {
    try {
      const user = await this.userRepository.getUserInfo({ userId })
      return user
    } catch (e) {
      console.log(`This error occurring in Service in getUserInfo method: ${e}`)
      throw new Error(e)
    }
  }
  // user 정보 수정
  async userUpdate({ userId, currentPw, userData }) {
    try {
      const user = await this.userRepository.getUserById({ userId })
      const currentPwHash = this.crypto
        .createHmac('sha256', SALT)
        .update(currentPw)
        .digest('hex')

      if (user.userPw !== currentPwHash) {
        throw new Error('Incorrect current password')
      }

      if (userData.newPassword) {
        userData.userPw = this.crypto
          .createHmac('sha256', SALT)
          .update(userData.newPassword)
          .digest('hex')
        delete userData.newPassword
      }

      const userUpdate = await this.userRepository.userUpdate({
        userId,
        userData,
      })
      console.log(`success userUpdate: ${userUpdate}`)
      return userUpdate, { message: 'success user Updated' }
    } catch (e) {
      console.log(`This error occurring in Service in userUpdate method: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = userService
