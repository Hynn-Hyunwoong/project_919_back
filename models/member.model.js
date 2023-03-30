module.exports = (sequelize, Sequelize) => {
  class Member extends Sequelize.Model {
    static initialize() {
      return Member.init(
        {
          memberIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          RecruitIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Recruit',
              key: 'recruitIndex',
            },
            field: 'recruitIndex',
          },
          UserIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'userIndex',
            },
            field: 'userIndex',
          },
        },
        { sequelize }
      )
    }

    static associate(models) {
      this.belongsTo(models.Recruit, {
        foreignKey: 'RecruitIndex',
        as: 'Recruit',
      })
      this.belongsTo(models.User, {
        foreignKey: 'UserIndex',
        as: 'User',
      })
    }
  }
  Member.initialize()
}
