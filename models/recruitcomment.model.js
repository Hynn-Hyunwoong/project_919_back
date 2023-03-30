module.exports = (sequelize, Sequelize) => {
  class RecruitComment extends Sequelize.Model {
    static initialize() {
      return RecruitComment.init(
        {
          recruitCommentIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          content: {
            type: Sequelize.TEXT,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.Recruit, {
        foreignKey: 'recruitIndex',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userIndex',
        sourceKey: 'userIndex',
      })
    }
  }
  RecruitComment.initialize()
}
