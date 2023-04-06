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
          hidden: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        },
        { sequelize }
      )
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
      this.belongsToMany(models.User, {
        through: models.Member,
        foreignKey: 'RecruitIndex',
        otherKey: 'UserIndex',
      })
    }
  }
  Recruit.initialize()
}
