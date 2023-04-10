class CaculatorController {
  constructor({ caculatorService }) {
    this.CaculatorService = caculatorService
  }

  async getHolePlatform(req, res, next) {
    try {
      const result = await this.CaculatorService.getHolePlatform()
      res.status(200).json(result)
    } catch (e) {
      console.log(`This error occurring in getHolePlatform.Controller: ${e}`)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getOttPlanByPlatform(req, res, next) {
    try {
      console.log(`Testing to code try Controller${this}`)
      const { platformName } = req.params
      console.log(
        `This Processing in getOttPlanByPlatform.Controller: ${platformName}`
      )
      const response = await this.CaculatorService.getOttPlanByPlatform(
        platformName
      )
      console.log(
        `This Processing in getOttPlanByPlatform.Controller: ${response}`
      )
      res.status(200).json(response)
    } catch (e) {
      console.log(`Testing to code catch Controller ${this}`)
      res.status(500).json({ message: e.message })
      next(e)
    }
  }

  async getConvertedPrice(req, res, next) {
    try {
      const ottPlanIndex = req.params.ottPlanIndex
      const price = await this.CaculatorService.getConvertedPrice(ottPlanIndex)
      res.status(200).json(price)
    } catch (e) {
      console.log(`This error occurring in getConvertedPrice.Controller: ${e}`)
      res.status(500).send({ message: e.message })
      next(e)
    }
  }
}

module.exports = CaculatorController
