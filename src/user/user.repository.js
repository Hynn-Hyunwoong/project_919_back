class userRepository {
  constructor({ User, sequelize, Sequelize }) {
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }

  async addUser(payload) {
    try {
      const user = await this.User.create(payload, { raw: true })
      return user
    } catch (e) {
      console.log(`This error occurring in Repository in addUser method: ${e}`)
      throw new Error(e)
    }
  }

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
}

module.exports = userRepository
