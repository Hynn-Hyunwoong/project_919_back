const awsController = require('../aws/aws.controller')

class SearchRepository {
  constructor({ Recruit, User, sequelize, Sequelize }) {
    this.Recruit = Recruit
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // endDate 기준으로 hidden 처리
  async updateHiddenStatus() {
    try {
      await this.Recruit.update()
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in updateHiddenStatus method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = SearchRepository
