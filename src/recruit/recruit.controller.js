class RecruitController {
  constructor({ recruitService }) {
    this.recruitService = recruitService
  }
  // 전체 게시물 가져오기
  async getAllRecruit(req, res, next) {
    const start = parseInt(req.query.start)
    const limit = parseInt(req.query.limit)
    try {
      const response = await this.recruitService.getAllRecruit(start, limit)
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  // 1게시물 가져오기
  async getOneRecruit(req, res, next) {
    try {
      const { recruitIndex } = req.params
      const response = await this.recruitService.getOneRecruit(recruitIndex)
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  // Hidden 게시물 가져오기
  async getHiddenRecruit(req, res, next) {
    const start = parseInt(req.query.start)
    const limit = parseInt(req.query.limit)
    try {
      const { hidden } = req.params
      const response = await this.recruitService.getHiddenRecruit(
        hidden,
        start,
        limit
      )
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message || 'Internal Server Error' })
    }
  }
  // 플랫폼별 게시물 가져오기
  async getPlatformRecruit(req, res, next) {
    const start = parseInt(req.query.start)
    const limit = parseInt(req.query.limit)
    try {
      const { platformName } = req.params
      console.log('this code is paltformname in controller : ', platformName)
      const response = await this.recruitService.getPlatformRecruit(
        platformName,
        start,
        limit
      )
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  // 게시물 등록하기
  async createRecruit(req, res, next) {
    try {
      const data = req.body
      const response = await this.recruitService.createRecruit(data)
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = RecruitController
