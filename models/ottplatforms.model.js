module.exports = (sequelize, Sequelize) => {
  class ottPlatform extends Sequelize.Model {
    static initialize() {
      return ottPlatform.init(
        {
          ottPlatformIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          platformName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          Image: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },

        { sequelize }
      )
    }
    static associate(models) {
      this.hasMany(models.ottPlan, {
        foreignKey: 'ottPlatformIndex',
      })
    }
  }
  ottPlatform.initialize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
