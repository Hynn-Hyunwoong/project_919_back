const { json } = require('sequelize')

class recruitRepository {
  constructor({
    User,
    ottPlatform,
    ottPlan,
    Recruit,
    Country,
    Member,
    sequelize,
    Sequelize,
  }) {
    this.User = User
    this.ottPlan = ottPlan
    this.ottPlatform = ottPlatform
    this.Recruit = Recruit
    this.Country = Country
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }

  async getPlatform() {
    try {
      const platformList = await this.ottPlatform.findAll({
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
      const planList = await this.ottPlan.findAll({
        raw: true,
        include: [
          {
            model: this.ottPlatform,
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

  async postContent(body) {
    try {
      const { dataValues } = await this.Recruit.create(body, {
        raw: true,
      })
      return dataValues.recruitIndex
    } catch (e) {
      console.log(
        `This error occurring in Repository in postContent method: ${e}`
      )
      throw new Error(e)
    }
  }

  async getView(idx) {
    try {
      console.log(idx)
      const result = await this.Recruit.findOne({
        raw: true,
        where: { recruitIndex: `${idx}` },
        include: [
          { model: this.User, attributes: ['userNick'], required: false },
          {
            model: this.ottPlan,
            attributes: ['planName', 'price', 'limit'],
            required: false,
            include: [
              {
                model: this.ottPlatform,
                attributes: ['platformName', 'Image'],
                required: false,
              },
              {
                model: this.Country,
                attributes: ['countryCode'],
                required: false,
              },
            ],
          },
        ],
      })
      return result
    } catch (e) {
      console.log(`This error occurring in Service in getView method: ${e}`)
      throw new Error(e)
    }
  }

  async getList() {
    try {
      const result = await this.Recruit.findAll({
        raw: true,
        limit: 10,
        attributes: ['recruitIndex', 'title', 'hidden'],
        include: [
          { model: this.User, attributes: ['userNick'], required: false },
          {
            model: this.ottPlan,
            attributes: ['planName', 'price', 'limit'],
            required: false,
            include: [
              {
                model: this.ottPlatform,
                attributes: ['Image'],
                required: false,
              },
              {
                model: this.Country,
                attributes: ['countryCode'],
                required: false,
              },
            ],
          },
        ],
      })
      return result
    } catch (e) {
      console.log(`This error occurring in Service in getView method: ${e}`)
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
