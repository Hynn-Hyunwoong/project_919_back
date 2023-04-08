module.exports = (sequelize, Sequelize) => {
  class Message extends Sequelize.Model {
    static initialize() {
      return Message.init(
        {
          messageIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          content: {
            type: Sequelize.TEXT,
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
          recruitIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Recruit',
              key: 'recruitIndex',
            },
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userIndex',
      })
      this.belongsTo(models.Recruit, {
        foreignKey: 'recruitIndex',
      })
    }
  }
  Message.initialize()
  return Message
}
