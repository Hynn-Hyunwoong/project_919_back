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
          platformId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          country: {
            type: Sequelize.INTEGER,
          },
          planName: {
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
