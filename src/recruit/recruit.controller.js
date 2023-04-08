class RecruitController {
  constructor({ recruitService }) {
    this.recruitService = recruitService
  }

  async getAllRecruit(req, res, next) {
    try {
      const response = await this.recruitService.getAllRecruit()
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = RecruitController
