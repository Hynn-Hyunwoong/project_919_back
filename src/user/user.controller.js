class userController {
  constructor({ userService }) {
    this.userService = userService
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

  // ID중복체크
  async userIdChecker(req, res, next) {
    try {
      const { userId } = req.body
      const user = await this.userService.userIdChecker({ userId })
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
}

module.exports = userController
