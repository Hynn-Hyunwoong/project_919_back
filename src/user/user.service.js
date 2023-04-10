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
      console.log('test by service : ', user)
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
    picture,
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
      const token = this.jwt.Sign(
        { userId: user.userId, userNick: user.userNick },
        SALT,
        {
          expiresIn: 30 * 60,
        }
      )
      return { token, user }
    } catch (e) {
      console.log(`This error occurring in Service in userLogin method: ${e}`)
      throw new Error(e)
    }
  }

  // Token 검증
  async validateToken({ userId }) {
    try {
      const user = await this.userRepository.getUserInfo({ userId })
      return !!user
    } catch (e) {
      console.log(
        `This error occurring in Service in validateToken method: ${e}`
      )
      throw new Error(e)
    }
  }

  // Token 갱신
  async refreshToken({ userId }) {
    try {
      const user = await this.userRepository.getUserInfo({ userId })
      if (!user)
        throw new Error(
          '로그인 유효시간이 만료되었습니다. 다시 로그인해주세요.'
        )

      const tokenPayload = { userId: user.userId }
      const token = this.jwt.Sign(tokenPayload, SALT, { expiresIn: 30 * 60 })
      return token
    } catch (e) {
      console.log(
        `This error occurring in Service in refreshToken method: ${e}`
      )
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
  async userUpdate({ userId, userData, picture }) {
    try {
      // const user = await this.userRepository.getUserInfo({ userId })
      // const currentPwHash = this.crypto
      //   .createHmac('sha256', SALT)
      //   .update(currentPw)
      //   .digest('hex')

      // if (user.userPw !== currentPwHash) {
      //   throw new Error('비밀번호가 일치하지 않습니다.')
      // }

      if (userData.newPassword) {
        userData.userPw = this.crypto
          .createHmac('sha256', SALT)
          .update(userData.newPassword)
          .digest('hex')
        delete userData.newPassword
      }
      if (picture) {
        userData.picture = picture
      }

      const updateUser = await this.userRepository.userUpdate({
        // userId,
        userData,
      })
      console.log('Sucess userUpdate in userService : ', updateUser)
      return updateUser
      // message: '회원정보가 수정되었습니다.'
    } catch (e) {
      console.log(`This error occurring in Service in userUpdate method: ${e}`)
      throw new Error(e)
    }
  }

  // 참여한 파티 모두 불러오기
  async userList(userId) {
    try {
      const myLike = await this.userRepository.myLike(userId)
      const myPost = await this.userRepository.myPost(userId)
      const myList = await this.userRepository.myList(userId)
      return { myLike, myPost, myList }
    } catch (e) {
      console.log(`This error occurring in Service in userList method: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = userService
