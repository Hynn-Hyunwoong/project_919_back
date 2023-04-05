class recruitRepository {
  constructor({ models }) {
    this.models = models
  }

  async getPlatform() {
    try {
      const platformList = await this.models.ottPlatform.findAll({
        raw: true,
      })
      return platformList
    } catch (e) {
      console.log(
        `This error occurring in Repository in getPlatform method: ${e}`
      )
      throw new Error(e)
    }
  }

  async postPlan(ottname) {
    try {
      const planList = await this.models.ottPlan.findAll({
        raw: true,
        include: [
          {
            model: this.models.ottPlatform,
            where: { platformName: ottname },
          },
        ],
      })
      return planList
    } catch (e) {
      console.log(`This error occurring in Repository in getPlan method: ${e}`)
      throw new Error(e)
    }
  }

  // // ID 중복 체크
  // async userIdChecker({ userId }) {
  //   try {
  //     const user = await this.User.findOne({
  //       raw: true,
  //       where: {
  //         userId,
  //       },
  //     })
  //     return user
  //   } catch (e) {
  //     console.log(
  //       `This error occurring in Repository in userIdChecker method: ${e}`
  //     )
  //     throw new Error(e)
  //   }
  // }
}

module.exports = recruitRepository
