const sequelize = require('sequelize')
const Op = sequelize.Op

class SearchRepository {
  constructor({ Recruit, User, sequelize, Sequelize, ottPlatform, ottPlan }) {
    this.Recruit = Recruit
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
    this.ottPlatform = ottPlatform
    this.ottPlan = ottPlan
  }

  async getResult(keyword) {
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
        include: [
          {
            model: this.User,
            attributes: ['userNick'],
            required: true,
          },
          {
            model: this.ottPlan,
            attributes: [
              'planName',
              'ottPlatformIndex',
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.Image FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformImage',
              ],
            ],
            // include: [{ model: this.ottPlatform }],
          },
        ],
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
