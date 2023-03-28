const countries = [
  { countryCode: 'IDR', countryName: 'Indonesia' },
  { countryCode: 'PHP', countryName: 'Philippines' },
  { countryCode: 'TRY', countryName: 'Turkiye' },
  { countryCode: 'ARS', countryName: 'Argentina' },
  { countryCode: 'INR', countryName: 'INDIA' },
  { countryCode: 'KRW', countryName: 'Korea' },
]
const countryData = countries.map((country, index) => {
  return {
    countryIndex: index + 1,
    countryCode: country.countryCode,
    countryName: country.countryName,
  }
})

module.exports = countryData
