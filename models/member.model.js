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
          recruitIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Recruit',
              key: 'recruitIndex',
            },
            field: 'recruitIndex',
          },
          userIndex: {
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
        foreignKey: 'recruitIndex',
        as: 'Recruit',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userIndex',
        as: 'User',
      })
    }
  }
  Member.initialize()
  return Member
}
