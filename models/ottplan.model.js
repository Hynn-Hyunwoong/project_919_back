module.exports = (sequelize, Sequelize) => {
  class ottPlan extends Sequelize.Model {
    static initialize() {
      return ottPlan.init(
        {
          ottPlanIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          planName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          planType: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          limit: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.ottPlatforms, {
        foreignKey: 'ottPlatformIndex',
      })
      this.belongsTo(models.Country, {
        foreignKey: 'countryIndex',
      })
      this.hasMany(models.Recruit, {
        foreignKey: 'ottPlanIndex',
      })
    }
  }
  ottPlan.initialize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
