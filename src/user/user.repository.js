class userRepository {
  constructor({ User, sequelize, Sequelize }) {
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // User 가입
  async userAdd(payload) {
    try {
      const user = await this.User.create(payload, { raw: true })
      return user
    } catch (e) {
      console.log(`This error occurring in Repository in addUser method: ${e}`)
      throw new Error(e)
    }
  }
  // ID 중복 체크
  async userIdChecker({ userId }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userId,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in userIdChecker method: ${e}`
      )
      throw new Error(e)
    }
  }
  // Phone 중복 체크
  async checkPhone({ phone }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          phone,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in checkPhone method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = userRepository
