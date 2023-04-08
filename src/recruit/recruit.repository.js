const { Op } = require('sequelize')

class RecruitRepository {
  constructor({
    Recruit,
    User,
    Like,
    ottPlatfrom,
    ottPlan,
    Currency,
    Country,
    Member,
    sequelize,
    Sequelize,
  }) {
    this.Recruit = Recruit
    this.User = User
    this.Like = Like
    this.ottPlatfrom = ottPlatfrom
    this.ottPlan = ottPlan
    this.Country = Country
    this.Currency = Currency
    this.Member = Member
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }

  async getAllRecruit() {
    try {
      const response = await this.Recruit.findAll({
        include: [
          {
            model: this.User,
            attributes: ['userNick', 'picture'],
          },
          {
            model: this.Like,
            attributes: ['userIndex', 'recruitIndex'],
          },
          {
            model: this.ottPlan,
            attributes: [
              'planName',
              'price',
              'countryIndex',
              [
                this.sequelize.literal(
                  `(SELECT Currencies.currencyValue FROM Currency AS Currencies WHERE Currencies.countryIndex = ottPlan.countryIndex AND Currencies.currencyDate = (SELECT MAX(C2.currencyDate) FROM Currency AS C2 WHERE C2.countryIndex = Currencies.countryIndex))`
                ),
                'currencyValue',
              ],
            ],
            include: [
              {
                model: this.Country,
                attributes: ['countryName'],
                where: { countryName: { [Op.ne]: 'Korea' } },
              },
            ],
          },
          {
            model: this.User,
            as: 'Members',
            attributes: ['userNick', 'picture'],
            through: { attributes: [] },
          },
        ],
      })
      console.log(`This Processing in the recruit.repository: `, response)
      return response
    } catch (e) {
      console.log(
        `This error occurring recrut.repository.js in getAllRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = RecruitRepository
