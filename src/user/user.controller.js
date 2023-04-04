class userController {
  constructor({ userService }) {
    this.userService = userService
  }
  // ID중복체크
  async userIdChecker(req, res, next) {
    try {
      const { userId } = req.body
      const user = await this.userService.userIdChecker({
        userId: userId.value,
      })
      res.status(201).json(user)
    } catch (e) {
      console.log(
        `This error occurring in Controller in userIdChecker method: ${e}`
      )
      next(e)
    }
  }
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
        picture,
        verified,
        phoneVerificationCode,
        phoneVerificationExpiry,
      } = req.body
      console.log(
        req.body,
        'this is req.body in tagged on user.controller.userAdd'
      )
      // const user = await this.userService.userAdd({
      //   userId: userId.value,
      //   userPw: userPw.value,
      //   userNick: userNick.value,
      //   phone: phone.value,
      //   picture: picture.value,
      //   verified,
      //   phoneVerificationCode,
      //   phoneVerificationExpiry,
      // })
      // res.status(201).json(user)
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
      const { token, user } = await this.userService.userLogin({
        userId,
        userPw,
      })
      console.log(token, user, 'this is token and user in tagged on userLogin')
      res.status(201).json({ token, user })
    } catch (e) {
      console.log(
        `This error occurring in Controller in userLogin method: ${e}`
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
  async userUpdate(req, res, next) {
    try {
      const { userId } = req.user
      const userData = req.body
      if (!userData.currentPw) {
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' })
      }
      const updateUser = await this.userService.userUpdate({
        userId,
        currentPw: userData.currentPw,
        userData,
      })
      res.status(201).json(updateUser)
    } catch (e) {
      console.log(
        `This error occurring in Controller in userUpdate method: ${e}`
      )
      next(e)
    }
  }
}

module.exports = userController
