module.exports = (sequelize, Sequelize) => {
  class Currency extends Sequelize.Model {
    static initialize() {
      return Currency.init(
        {
          currencyValue: {
            type: Sequelize.STRING,
          },
          currencyDate: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { sequelize }
      )
    }
    static associate(models) {
      this.belongsTo(models.Country, {
        foreignKey: 'countryIndex',
      })
    }
  }
  Currency.initialize()
  return Currency
}
