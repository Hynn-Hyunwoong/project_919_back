class CaculatorRepository {
  constructor({
    ottPlatform,
    ottPlan,
    Currency,
    Country,
    sequelize,
    Sequelize,
  }) {
    this.ottPlatform = ottPlatform
    this.ottPlan = ottPlan
    this.Currency = Currency
    this.Country = Country
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // OttPlatform 전체 가져오기
  async getAllPlatform() {
    try {
      const result = await this.ottPlatform.findAll({
        raw: true,
      })
      return result
    } catch (e) {
      console.log(`This error occurring in getAllPlatform.Repository: ${e}`)
      throw new Error(e)
    }
  }

  // 맨 처음 랜더! 모든 플랫폼 종류 + 환율 가져오기
  async getHolePlatform() {
    try {
      const result = await this.ottPlatform.findAll({
        raw: true,
      })
      const currency = await this.Currency.findAll({
        limit: 5,
        raw: true,
        order: [['currencyDate', 'DESC']],
        include: { model: this.Country },
      })
      return { result, currency }
    } catch (e) {
      console.log(`This error occurring in getHolePlatform.Repository: ${e}`)
      throw new Error(e)
    }
  }

  // async getCurrency() {
  //   try {
  //     const currency = await this.Currency.findAll({
  //       raw: true,
  //       order: [['currencyDate', 'DESC']],
  //     })
  //     console.log(currency)
  //   } catch (e) {
  //     console.log(`This error occurring in getCurrency.Repository: ${e}`)
  //     throw new Error(e)
  //   }
  // }

  // OttPlatform 선택시 해당 플랫폼 전체 요금제 가져오기
  async getOttPlanByPlatform(platformName) {
    try {
      console.log('ottPlatform:', this.ottPlatform)
      console.log(`Testing to code try Repository ${this}`)
      const platform = await this.ottPlatform.findOne({
        where: { platformName: platformName },
      })
      console.log(
        `This Processing in getOttPlanByPlatform.Repository: ${platform}`
      )
      const plan = await this.ottPlan.findAll({
        where: { ottPlatformIndex: platform.ottPlatformIndex },
      })
      return plan
    } catch (e) {
      console.log(`Testing to code catch Repository ${this}`)
      console.log(
        `This error occurring in getOttPlanByPlatform.Repository: ${e}`
      )
      throw new Error(e)
    }
  }
  // OttPlan 선택시 해당 요금제의 가격 가져오기
  async getConvertedPrice(ottPlanIndex) {
    try {
      const plan = await this.ottPlan.findOne({
        where: { ottPlanIndex },
        include: {
          model: this.Country,
          as: 'Country',
        },
      })
      if (plan.Country.countryName !== 'Korea') {
        const currency = await this.Currency.findOne({
          where: { countryIndex: plan.Country.countryIndex },
          order: [['currencyDate', 'DESC']],
        })
        console.log(`This Processing in getConvertedPrice.Repository: ${plan}`)
        console.log(
          `Price: ${plan.price}, Exchange Rate: ${currency.currencyValue}`
        )
        const convertedPrice = plan.price * currency.currencyValue
        const roundedPrice = Math.round(convertedPrice)
        return roundedPrice
      } else {
        return plan.price
      }
    } catch (e) {
      console.log(`This error occurring in getConvertedPrice.Repository: ${e}`)
      throw new Error(e)
    }
  }

  // 게시물 수정
  async updatePost(postIndex, postTitle, postContent) {
    try {
      const result = await this.Post.update(
        {
          postTitle,
          postContent,
        },
        {
          where: { postIndex },
        }
      )
      return result
    } catch (e) {
      console.log(`This error occurring in updatePost.Repository: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = CaculatorRepository
