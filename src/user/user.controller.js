class userController {
  constructor({ userService }) {
    this.userService = userService
  }

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
}

module.exports = userController
