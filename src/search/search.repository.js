const sequelize = require('sequelize')
const Op = sequelize.Op

class SearchRepository {
  constructor({ Recruit, User, sequelize, Sequelize }) {
    this.Recruit = Recruit
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // endDate 기준으로 hidden 처리
  // async updateHiddenStatus() {
  //   try {
  //     await this.Recruit.update()
  //   } catch (e) {
  //     console.log(
  //       `This error occurring recruit.repository.js in updateHiddenStatus method: ${e}`
  //     )
  //     throw new Error(e)
  //   }
  // }

  async getResult(keyword) {
    console.log(Op)
    try {
      const result = await this.Recruit.findAll({
        raw: true,
        limit: 10,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              content: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      })
      console.log(result)
      return result
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in updateHiddenStatus method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = SearchRepository
