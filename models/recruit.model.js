module.exports = (sequelize, Sequelize) => {
  class Recruit extends Sequelize.Model {
    static initialize() {
      return Recruit.init(
        {
          recruitIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
          },
          content: {
            type: Sequelize.TEXT,
          },
          openChatLink: {
            type: Sequelize.STRING,
          },
          startDate: {
            type: Sequelize.DATE,
          },
          endDate: {
            type: Sequelize.DATE,
          },
          perPrice: {
            type: Sequelize.INTEGER,
          },
          hidden: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        },
        { sequelize }
      )
      this.addHook('beforeFind', Recruit.beforeFind)
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userIndex',
        sourceKey: 'hostId',
      })
      this.belongsTo(models.ottPlan, {
        foreignKey: 'ottPlanIndex',
      })
      this.hasMany(models.RecruitComment, {
        foreignKey: 'recruitIndex',
      })
      this.hasMany(models.Like, {
        foreignKey: 'recruitIndex',
      })
      this.hasMany(models.Member, {
        foreignKey: 'recruitIndex',
        as: 'MemberRelation',
      })
      this.belongsToMany(models.User, {
        through: models.Member,
        foreignKey: 'recruitIndex',
        otherKey: 'userIndex',
        as: 'Members',
      })
    }
    static beforeFind(options) {
      options.hooks = false
      return this.update(
        { hidden: true },
        {
          where: {
            endDate: {
              [Sequelize.Op.lt]: new Date(),
            },
            hidden: false,
          },
          hooks: false,
        }
      ).then(() => options)
    }
  }
  Recruit.initialize()
  return Recruit
}
