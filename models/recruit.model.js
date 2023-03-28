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
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'HostId',
      })
      this.belongsTo(models.ottPlan, {
        foreignKey: 'ottPlanIndex',
      })
      this.hasMany(models.RecruitComment, {
        foreignKey: 'recruitIndex',
      })
      this.hasMany(models.Chat, {
        foreignKey: 'recruitIndex',
      })
      this.belongsToMany(models.User, {
        through: 'Member',
        foreignKey: 'RecruitIndex',
      })
    }
  }
  Recruit.initialize()
}
