// Module
const country = require('./exchange.countrylist')
const exchange = require('./exchange.header')
const axios = require('axios')
const saveExchangeRatesToDB = require('./exchange.repository')

// Value from Module
const { groupA, groupB } = country
const { APIURL } = exchange.URL
const reqOption = {
  headers: exchange.headers,
}
// Date Info
const today = new Date()
const todayDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

// Function
const getCurrency = async () => {
  const baseCountry = Object.values(groupB)[0]
  const targetCountry = Object.values(groupA)
    .map((currency) =>
      axios.get(
        `${APIURL}${todayDate}?symbols=${baseCountry}&base=${currency}`,
        reqOption
      )
    )
    .flat()

  try {
    const response = await Promise.all(targetCountry)
    const exchangeRates = {}

    response.forEach((res, index) => {
      const countryName = Object.keys(groupA)[index]
      const rate = res.data.rates[baseCountry].toFixed(2)

      exchangeRates[countryName] = rate

      console.log(
        `Exchange rate for ${countryName} (${
          Object.values(groupA)[index]
        }) to ${
          Object.keys(groupB)[0]
        } (${baseCountry}) on ${todayDate}: ${rate}`
      )
    })

    await saveExchangeRatesToDB(exchangeRates)
  } catch (e) {
    console.error(e)
  }
}

module.exports = getCurrency
