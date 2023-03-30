module.exports = (sequelize, Sequelize) => {
  class BoardComment extends Sequelize.Model {
    static initialize() {
      return BoardComment.init(
        {
          boardCommentIndex: {
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
      this.belongsTo(models.Board, {
        foreignKey: 'boardIndex',
      })
    }
  }
  BoardComment.initialize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
