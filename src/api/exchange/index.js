// Module
const country = require('./country')
const date = require('./date')
const exchange = require('./exchange')
const pricelist = require('./pricelist')
const axios = require('axios')

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
const result = async () => {
  const baseCountry = Object.values(groupB)[0]
  const targetCountry = Object.values(groupA).map((currency) =>
    axios.get(
      `${APIURL}${todayDate}?symbols=${baseCountry}&base=${currency}`,
      reqOption
    )
  ) // 기준국가 환율 가져오기

  // 환율 계산
  try {
    const response = await Promise.all(targetCountry) // PromiseAll 로 비동기 처리
    response.forEach((res, index) => {
      console.log(
        `Exchange rate for ${Object.keys(groupA)[index]} (${
          Object.values(groupA)[index]
        }) to ${Object.keys(groupB)[0]} (${baseCountry}) on ${todayDate}: ${
          res.data.rates[baseCountry]
        }`
      )
    })
  } catch (e) {
    console.error(e) // 오류 발생시 오류출력
  }
}

result()
