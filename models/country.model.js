module.exports = (sequelize, Sequelize) => {
  class Country extends Sequelize.Model {
    static initialize() {
      return Country.init(
        {
          countryIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          countryName: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          countryCode: {
            type: Sequelize.STRING,
            allowNull: true,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.hasMany(models.ottPlan, {
        foreignKey: 'countryIndex',
      })
      this.hasMany(models.Currency, {
        foreignKey: 'countryIndex',
      })
    }
  }
  Country.initialize()
}

// Bulk data creation
// Path: bulkdata/bulkdata.index.js
