module.exports = (sequelize, Sequelize) => {
  class ottPlatforms extends Sequelize.Model {
    static initialize() {
      return ottPlatforms.init(
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
  ottPlatforms.initialize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
