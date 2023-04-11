class CaculatorService {
  constructor({ caculatorRepository }) {
    this.CaculatorRepository = caculatorRepository
  }

  async getHolePlatform() {
    try {
      const result = await this.CaculatorRepository.getHolePlatform()
      // const currency = await this.caculatorRepository.getCurrency()
      console.log(result)
      return result
    } catch (e) {
      console.log(`Testing to code catch in Service ${this}`)
      console.log(`This error occurring in getOttPlanByPlatform.Service: ${e}`)
      throw new Error(e)
    }
  }

  async getOttPlanByPlatform(platformName) {
    try {
      console.log(`Testing to code try in Service ${this}`)
      const response = await this.CaculatorRepository.getOttPlanByPlatform(
        platformName
      )
      console.log(
        `This Processing in getOttPlanByPlatform.Service: ${response}`
      )
      return response
    } catch (e) {
      console.log(`Testing to code catch in Service ${this}`)
      console.log(`This error occurring in getOttPlanByPlatform.Service: ${e}`)
      throw new Error(e)
    }
  }

  async getConvertedPrice(ottPlanIndex) {
    try {
      const response = await this.CaculatorRepository.getConvertedPrice(
        ottPlanIndex
      )
      console.log(`This Processing in getConvertedPrice.Service: ${response}`)
      return response
    } catch (e) {
      console.log(`This error occurring in getConvertedPrice.Service: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = CaculatorService
