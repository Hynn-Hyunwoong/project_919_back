module.exports = (sequelize, Sequelize) => {
  class Chat extends Sequelize.Model {
    static initailize() {
      return Chat.init(
        {
          chatIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.Recruit, {
        foreignKey: 'recruitId',
      })
      this.hasMany(models.Message, {
        foreignKey: 'chatIndex',
      })
    }
  }
  Chat.initailize()
}
