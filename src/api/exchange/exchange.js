// Define Module and Dependencies
const path = require('path')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
})
const exchangeApiKey = process.env.CURRENCY_API_KEY
const URL = process.env.CURRENCY_URI
// Request API Exchange Currency
const reqOption = {
  headers: {
    apikey: exchangeApiKey,
    redirect: 'follow',
    'application-type': 'x-www-form-urlencde',
  },
  URL: {
    APIURL: process.env.CURRENCY_URI,
  },
}

module.exports = reqOption

// axios
//   .get(`${URL}2023-03-01?symbols=KRW&base=IDR`, reqOption)
//   .then((response) => {
//     console.log(response.data)
//   })
