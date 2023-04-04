class recruitController {
  constructor({ recruitService }) {
    this.recruitService = recruitService
  }

  async getWrite(req, res, next) {
    try {
      const result = await this.recruitService.getPlatform()
      res.status(201).json(result)
    } catch (e) {
      console.log(
        `This error occurring in Controller in platformName method: ${e}`
      )
    }
  }
  // // ID중복체크
  // async userIdChecker(req, res, next) {
  //   try {
  //     const { userId } = req.body
  //     const user = await this.userService.userIdChecker({ userId })
  //     res.status(201).json(user)
  //   } catch (e) {
  //     console.log(
  //       `This error occurring in Controller in userIdChecker method: ${e}`
  //     )
  //     next(e)
  //   }
  // }
}

module.exports = recruitController
