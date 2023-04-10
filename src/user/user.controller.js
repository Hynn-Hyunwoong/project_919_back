const { AWSs3 } = require('../aws/aws.model')
const config = require('../../config').s3

class userController {
  constructor({ userService }) {
    this.userService = userService
  }
  // ID중복체크
  async userIdChecker(req, res, next) {
    try {
      const { userId } = req.body
      console.log('test by controller : ', userId.value)
      const user = await this.userService.userIdChecker({
        userId: userId.value,
      })
      console.log('test', user)
      res.status(201).json(user)
    } catch (e) {
      console.log(
        `This error occurring in Controller in userIdChecker method: ${e}`
      )
      next(e)
    }
  }
  // Phone중복체크
  async checkPhone(req, res, next) {
    try {
      const { phone } = req.body
      const user = await this.userService.checkPhone({ phone })
      res.status(201).json(user)
    } catch (e) {
      console.log(
        `This error occurring in Controller in checkPhone method: ${e}`
      )
      next(e)
    }
  }

  // user가입
  async userAdd(req, res, next) {
    try {
      const {
        userId,
        userPw,
        userNick,
        phone,
        verified,
        phoneVerificationCode,
        phoneVerificationExpiry,
      } = req.body
      const picture = req.file ? req.file.key : 'project919files/profile.png'
      console.log(
        req.body,
        'this is req.body in tagged on user.controller.userAdd'
      )
      console.log(
        req.file,
        'this ins req.file in tagged on user.controller.userAdd'
      )
      const user = await this.userService.userAdd({
        userId,
        userPw,
        userNick,
        phone,
        picture,
        verified,
        phoneVerificationCode,
        phoneVerificationExpiry,
      })
      res.status(201).json(user)
    } catch (e) {
      console.log(`This error occurring in Controller in userAdd method: ${e}`)
      next(e)
    }
  }
  // user로그인
  async userLogin(req, res, next) {
    try {
      const { userId, userPw } = req.body
      console.log(
        req.body,
        'this is req.body in tagged on user.controller.userLogin'
      )
      const { token, user, e } = await this.userService.userLogin({
        userId,
        userPw,
      })
      console.log(token, user, 'this is token and user in tagged on userLogin')

      if (e) {
        res.status(401).json({ message: '로그인에 실패했습니다.' })
      } else {
        res.status(201).json({ token, user, message: '로그인에 성공했습니다.' })
      }
    } catch (e) {
      console.log(
        `This error occurring in Controller in userLogin method: ${e}`
      )
      res.status(500).json({ message: '로그인에 실패했습니다.' })
      next(e)
    }
  }

  // Token 검증
  // Token 검증
  async validateToken(req, res, next) {
    try {
      const { userId } = req.user
      console.log(
        `Token validation request for userId: ${userId} at ${new Date().toISOString()}`
      ) // 로그 추가
      const isValid = await this.userService.validateToken({ userId })

      if (isValid) {
        const token = await this.userService.refreshToken({ userId })
        res.status(200).json({ valid: true, token: token })
      } else {
        res.clearCookie('token')
        res.status(200).json({ valid: false })
      }
    } catch (e) {
      console.log(
        `This error occurring in Controller in validateToken method: ${e}`
      )
      next(e)
    }
  }

  // user정보 불러오기
  async getUserInfo(req, res, next) {
    try {
      const { userId } = req.user
      const user = await this.userService.getUserInfo({ userId })
      res.status(201).json(user)
    } catch (e) {
      console.log(
        `This error occurring in Controller in getUserInfo method: ${e}`
      )
      next(e)
    }
  }

  async getProfilePicture(req, res, next) {
    try {
      const { userId } = req.user
      const user = await this.userService.getUserInfo({ userId })
      if (!user.picture) {
        res.status(404).json({ message: '사진이 없습니다.' })
      }

      const params = {
        Bucket: config.BucketName,
        Key: user.picture,
        Expires: 60 * 20,
      }

      AWSs3.createSignedURL('getObject', params, (e, url) => {
        if (e) {
          console.log(`This error is createSignedURL IN user.controller`)
          next(e)
          return
        }
        res.status(200).json({ url })
      })
      res.status(201).json(updateUser)
    } catch (e) {
      console.log(
        `This error occurring in Controller in getProfilePicture method: ${e}`
      )
      next(e)
    }
  }
  async userUpdate(req, res, next) {
    try {
      // const { userId } = req.user
      const userData = req.body
      // const picture = req.file ? req.file.key : retrun
      const picture = req.file.key
      const updateUser = await this.userService.userUpdate({
        // userId,
        // currentPw: userData.currentPw,
        // userData: { ...userData },
        userData,
        picture: picture || user.picture,
      })
      res.status(201).json(updateUser)
    } catch (e) {
      console.log(
        `This error occurring in Controller in userUpdate method: ${e}`
      )
      next(e)
    }
  }

  async userLogout(req, res, next) {
    try {
      res.clearCookie('token')
      console.log('로그아웃 되었습니다.')
      res.status(200).json({ message: '로그아웃 되었습니다.' })
    } catch (e) {
      console.log(
        `This error occurring in Controller in userLogout method: ${e}`
      )
      next(e)
    }
  }

  // user 게시물 불러오기
  async userList(req, res, next) {
    try {
      const { userId } = req.user
      const result = await this.userService.userList(userId)
      return result
    } catch (e) {
      console.log(
        `This error occurring in Controller in userLogout method: ${e}`
      )
      next(e)
    }
  }
}

module.exports = userController
