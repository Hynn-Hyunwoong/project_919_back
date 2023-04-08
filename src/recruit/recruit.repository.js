const { Op } = require('sequelize')

class RecruitRepository {
  constructor({
    Recruit,
    User,
    Like,
    ottPlatform,
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
    this.ottPlatform = ottPlatform
    this.ottPlan = ottPlan
    this.Country = Country
    this.Currency = Currency
    this.Member = Member
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // 전체 게시물 가져오기
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
              'ottPlatformIndex',
              [
                this.sequelize.literal(
                  `(SELECT Currencies.currencyValue FROM Currency AS Currencies WHERE Currencies.countryIndex = ottPlan.countryIndex AND Currencies.currencyDate = (SELECT MAX(C2.currencyDate) FROM Currency AS C2 WHERE C2.countryIndex = Currencies.countryIndex))`
                ),
                'currencyValue',
              ],
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.platformName FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformName',
              ],
            ],
            include: [
              {
                model: this.Country,
                attributes: [
                  [
                    this.sequelize.literal(
                      `CASE WHEN \`ottPlan->Country\`.\`countryName\` = 'Korea' THEN NULL ELSE \`ottPlan->Country\`.\`countryName\` END`
                    ),
                    'countryName',
                  ],
                ],
                required: false,
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
        `This error occurring recruit.repository.js in getAllRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  // 1게시물 가져오기
  async getOneRecruit(recruitIndex) {
    try {
      const response = await this.Recruit.findOne({
        where: { recruitIndex: recruitIndex },
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.platformName FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformName',
              ],
            ],
            include: [
              {
                model: this.Country,
                attributes: [
                  [
                    this.sequelize.literal(
                      `CASE WHEN \`ottPlan->Country\`.\`countryName\` = 'Korea' THEN NULL ELSE \`ottPlan->Country\`.\`countryName\` END`
                    ),
                    'countryName',
                  ],
                ],
                required: false,
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
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in getOneRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  // hidden true or false 게시물 가져오기
  async getHiddenRecruit(hidden) {
    try {
      let where = {}
      if (hidden === 'true') {
        where.hidden = true
      } else if (hidden === 'false') {
        where.hidden = false
      } else {
        throw new Error('hidden is not true or false')
      }
      const response = await this.Recruit.findAll({
        where: where,
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.platformName FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformName',
              ],
            ],
            include: [
              {
                model: this.Country,
                attributes: [
                  [
                    this.sequelize.literal(
                      `CASE WHEN \`ottPlan->Country\`.\`countryName\` = 'Korea' THEN NULL ELSE \`ottPlan->Country\`.\`countryName\` END`
                    ),
                    'countryName',
                  ],
                ],
                required: false,
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
      console.log(
        `This Processing in the hidden.recruit.repository: `,
        response
      )
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in getHiddenRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  // Platform 형식에 맞는 게시물 리스트 출력
  async getAllRecruit(platformName) {
    try {
      const platformRanges = {
        Youtube: [1, 11],
        Netflix: [12, 15],
        DisneyPlus: [16, 17],
        Watcha: [18, 19],
        Wavve: [20, 25],
        Tving: [26, 31],
      }

      const range = platformRanges[platformName]

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
              'ottPlatformIndex',
              [
                this.sequelize.literal(
                  `(SELECT Currencies.currencyValue FROM Currency AS Currencies WHERE Currencies.countryIndex = ottPlan.countryIndex AND Currencies.currencyDate = (SELECT MAX(C2.currencyDate) FROM Currency AS C2 WHERE C2.countryIndex = Currencies.countryIndex))`
                ),
                'currencyValue',
              ],
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.platformName FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformName',
              ],
            ],
            include: [
              {
                model: this.Country,
                attributes: [
                  [
                    this.sequelize.literal(
                      `CASE WHEN \`ottPlan->Country\`.\`countryName\` = 'Korea' THEN NULL ELSE \`ottPlan->Country\`.\`countryName\` END`
                    ),
                    'countryName',
                  ],
                ],
                required: false,
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
        where: {
          ottPlanIndex: {
            [Op.between]: [range[0], range[1]],
          },
        },
      })

      console.log(`This Processing in the recruit.repository: `, response)
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in getAllRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = RecruitRepository
