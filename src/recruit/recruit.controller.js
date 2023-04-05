class recruitController {
  constructor({ recruitService }) {
    this.recruitService = recruitService
  }
  // 플랫폼 불러오는 컨트롤러
  async getWrite(req, res, next) {
    try {
      const result = await this.recruitService.getPlatform()
      res.status(201).json(result)
    } catch (e) {
      console.log(`This error occurring in Controller in getWrite method: ${e}`)
    }
  }

  // 플랜 불러오는 컨트롤러
  async postPlan(req, res, next) {
    try {
      const ottname = req.body.string
      const result = await this.recruitService.postPlan(ottname)
      res.status(201).json(result)
    } catch (e) {
      console.log(`This error occurring in Controller in postPlan method: ${e}`)
    }
  }

  // 게시물 insert
  async postContent(req, res, next) {
    try {
      const idx = await this.recruitService.postContent(req.body)
      res.status(201).json(idx)
    } catch (e) {
      console.log(
        `This error occurring in Controller in postContent method: ${e}`
      )
    }
  }

  // getView
  async getView(req, res, next) {
    try {
      const idx = req.params.id
      const getView = await this.recruitService.getView(idx)
      res.status(201).json(getView)
    } catch (e) {
      console.log(`This error occurring in Controller in getView method: ${e}`)
    }
  }

  async getList(req, res, next) {
    try {
      const list = await this.recruitService.getList()
      return res.status(201).json(list)
    } catch (e) {
      console.log(`This error occurring in Controller in getList method: ${e}`)
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
