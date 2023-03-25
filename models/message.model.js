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
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.Chat, {
        foreignKey: 'chatIndex',
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Message.initialize()
}
