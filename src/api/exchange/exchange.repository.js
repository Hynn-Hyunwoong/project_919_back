const { sequelize } = require('../../../models')
const { Country, Currency } = sequelize.models

const saveExchangeRatesToDB = async (exchangeRates) => {
  for (const [countryCode, rate] of Object.entries(exchangeRates)) {
    const country = await Country.findOne({
      where: { countryName: countryCode },
    })

    if (country) {
      await Currency.create({
        currencyValue: rate,
        currencyDate: new Date(),
        countryIndex: country.countryIndex,
      })
    }
  }
}

module.exports = saveExchangeRatesToDB
