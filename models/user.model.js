module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    static initialize() {
      return User.init(
        {
          userIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          userPw: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userNick: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          picture: {
            type: Sequelize.STRING,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.hasMany(models.Recruit, {
        foreignKey: 'userIndex',
      })
      this.hasMany(models.Board, {
        foreignKey: 'userIndex',
      })
      this.hasMany(models.Message, {
        foreignKey: 'userIndex',
      })
      this.hasMany(models.RecruitComment, {
        foreignKey: 'userIndex',
      })
      this.hasMany(models.BoardComment, {
        foreignKey: 'userIndex',
      })
      this.hasMany(models.Like, {
        foreignKey: 'userIndex',
      })
      this.belongsToMany(models.Recruit, {
        through: models.Member,
        foreignKey: 'userIndex',
        otherKey: 'recruitIndex',
      })
    }
  }
  User.initialize()
  return User
}
