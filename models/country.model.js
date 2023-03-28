module.exports = (sequelize, Sequelize) => {
  class Country extends Sequelize.Model {
    static initialize() {
      return Country.init(
        {
          countryIndex: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          countryCode: {
            type: Sequelize.STRING,
          },
          currency: {
            type: Sequelize.STRING,
          },
          currencyDate: {
            type: Sequelize.DATE,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.hasMany(models.ottPlan, {
        foreignKey: 'countryIndex',
      })
    }
  }
  Country.initialize()
}
