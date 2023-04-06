module.exports = (sequelize, Sequelize) => {
  class Like extends Sequelize.Model {
    static initialize() {
      return Like.init(
        {
          userIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          recruitIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
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
  Like.initialize()
}
