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
          userIndex: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          userPw: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userName: {
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
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          picture: {
            type: Sequelize.STRING,
          },
          verified: {
            type: Sequelize.BOOLEAN,
          },
          phoneVerificationCode: {
            type: Sequelize.STRING,
          },
          phoneVerificationExpiry: {
            type: Sequelize.DATE,
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
      this.belongsToMany(models.Recruit, {
        through: 'Member',
        foreignKey: 'userIndex',
      })
    }
  }
  User.initialize()
}
