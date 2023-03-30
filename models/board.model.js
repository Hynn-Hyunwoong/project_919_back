module.exports = (sequelize, Sequelize) => {
  class Board extends Sequelize.Model {
    static initalize() {
      return Board.init(
        {
          boardIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          subject: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          hit: {
            type: Sequelize.INTEGER,
          },
          category: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.hasMany(models.BoardComment, {
        foreignKey: 'boardIndex',
      })
    }
  }
  Board.initalize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
