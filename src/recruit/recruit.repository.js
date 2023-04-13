const { Op } = require('sequelize')
const awsController = require('../aws/aws.controller')

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
  // endDate 기준으로 hidden 처리
  async updateHiddenStatus() {
    try {
      await this.Recruit.update(
        { hidden: true },
        {
          where: {
            endDate: {
              [this.Sequelize.Op.lt]: new Date(),
            },
            hidden: false,
          },
        }
      )
      // 참여 Member 수와 Limit 값 비교하여 자동 Hidden 처리
      const recruits = await this.Recruit.findAll({
        include: [
          {
            model: this.Member,
            attributes: ['recruitIndex'],
            as: 'MemberRelation',
          },
          {
            model: this.ottPlan,
            attributes: ['limit'],
          },
        ],
        where: {
          hidden: false,
        },
      })

      for (const recruit of recruits) {
        const memberCount = recruit.MemberRelation.length
        const ottPlanLimit = recruit.ottPlan.limit
        if (memberCount >= ottPlanLimit) {
          await recruit.update({ hidden: true })
        }
      }
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in updateHiddenStatus method: ${e}`
      )
      throw new Error(e)
    }
  }

  // 전체 게시물 가져오기
  async getAllRecruit(start, limit) {
    try {
      await this.updateHiddenStatus()
      const response = await this.Recruit.findAll({
        offset: start,
        limit: limit,
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.Image FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformImage',
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
      for (const recruit of response) {
        if (recruit.User.picture) {
          recruit.User.dataValues.pictureSignedUrl =
            await awsController.getSignedUrl(recruit.User.picture)
        }
        for (const member of recruit.Members) {
          if (member.picture) {
            member.dataValues.pictureSignedUrl =
              await awsController.getSignedUrl(member.picture)
          }
        }
      }
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
      await this.updateHiddenStatus()
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
              'limit',
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.Image FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformImage',
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
      if (response.User.picture) {
        response.User.dataValues.pictureSignedUrl =
          await awsController.getSignedUrl(response.User.picture)
      }
      for (const member of response.Members) {
        if (member.picture) {
          member.dataValues.pictureSignedUrl = await awsController.getSignedUrl(
            member.picture
          )
        }
      }
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in getOneRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  // hidden true or false 게시물 가져오기
  async getHiddenRecruit(hidden, start, limit) {
    try {
      await this.updateHiddenStatus()
      let where = {}
      if (hidden === 'true') {
        where.hidden = true
      } else if (hidden === 'false') {
        where.hidden = false
      } else {
        throw new Error('hidden is not true or false')
      }
      const response = await this.Recruit.findAll({
        offset: start,
        limit: limit,
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.Image FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformImage',
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
      for (const recruit of response) {
        if (recruit.User.picture) {
          recruit.User.dataValues.pictureSignedUrl =
            await awsController.getSignedUrl(recruit.User.picture)
        }
        for (const member of recruit.Members) {
          if (member.picture) {
            member.dataValues.pictureSignedUrl =
              await awsController.getSignedUrl(member.picture)
          }
        }
      }
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
  async getPlatformRecruit(platformName, start, limit) {
    try {
      await this.updateHiddenStatus()
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
        offset: start,
        limit: limit,
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
              [
                this.sequelize.literal(
                  `(SELECT ottPlatforms.Image FROM ottPlatform AS ottPlatforms WHERE ottPlatforms.ottPlatformIndex = ottPlan.ottPlatformIndex)`
                ),
                'platformImage',
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
          hidden: false,
        },
      })
      for (const recruit of response) {
        if (recruit.User.picture) {
          recruit.User.dataValues.pictureSignedUrl =
            await awsController.getSignedUrl(recruit.User.picture)
        }
        for (const member of recruit.Members) {
          if (member.picture) {
            member.dataValues.pictureSignedUrl =
              await awsController.getSignedUrl(member.picture)
          }
        }
      }
      console.log(`This Processing in the recruit.repository: `, response)
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in getAllRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  // 게시물 작성하기
  async createRecruit(data) {
    try {
      const {
        title,
        content,
        openChatLink,
        startDate,
        endDate,
        ottPlanIndex,
        userIndex,
        perPrice,
      } = data
      console.log('userIndex:', data)
      const response = await this.Recruit.create({
        title,
        content,
        openChatLink,
        startDate,
        endDate,
        ottPlanIndex,
        userIndex,
        perPrice,
      })
      console.log('userIndex2:', userIndex)

      await this.Member.create({
        userIndex: userIndex,
        recruitIndex: response.recruitIndex,
      })
      console.log(`This Processing in the recruit.repository: `, response)
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in createRecruit method: ${e}`
      )
      throw new Error(e)
    }
  }
  async joinMember(data) {
    try {
      const { userIndex, recruitIndex } = data
      const existingMember = await this.Member.findOne({
        where: { userIndex, recruitIndex },
      })
      if (existingMember) {
        await this.Member.destroy({
          where: { userIndex, recruitIndex },
        })
        return { message: 'Member removed' }
      } else {
        const response = await this.Member.create({
          userIndex,
          recruitIndex,
        })
        return response
      }
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in joinMember method: ${e}`
      )
      throw new Error(e)
    }
  }

  async checkMember(data) {
    try {
      const { userIndex } = data
      const response = await this.Member.findAll({
        where: { userIndex },
      })
      return response
    } catch (e) {
      console.log(
        `This error occurring recruit.repository.js in checkMember method: ${e}`
      )
      throw new Error(e)
    }
  }
  // 게시물 수정
  async updateRecruit(data) {
    try {
      const {
        title,
        content,
        openChatLink,
        startDate,
        endDate,
        ottPlanIndex,
        recruitIndex,
      } = data
      const response = await this.Recruit.update(
        {
          title,
          content,
          openChatLink,
          startDate,
          endDate,
          ottPlanIndex,
        },
        {
          where: { recruitIndex },
        }
      )
      console.log(`This Processing in the recruit.repository: `, response)
      return response
    } catch (e) {
      {
        console.log(`This Error in the recruit.repository: ${e}`)
        throw new Error(e)
      }
    }
  }
}

module.exports = RecruitRepository
