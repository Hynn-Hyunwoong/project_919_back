const currencyValues = {
  TRY: [
    69.75, 69.82, 69.37, 69.04, 68.58, 68.66, 69.64, 69.59, 69.83, 68.89, 68.72,
    68.56, 69.03, 68.54, 68.8, 68.69, 68.64, 67.54, 67.57, 68.09, 67.85, 67.82,
    67.98, 67.46, 68.52,
  ],
  PHP: [
    23.72, 23.99, 23.79, 23.83, 23.54, 23.59, 23.83, 23.92, 24.03, 23.77, 23.7,
    23.66, 23.89, 23.84, 24.08, 24.08, 24.02, 23.7, 23.76, 24.01, 23.84, 23.91,
    23.96, 23.85, 24.13,
  ],
  INR: [
    15.94, 16.01, 15.91, 15.97, 15.85, 15.84, 16.1, 16.09, 16.17, 15.89, 15.86,
    15.7, 15.88, 15.79, 15.86, 15.82, 15.84, 15.65, 15.66, 15.82, 15.79, 15.81,
    15.88, 15.76, 16.01,
  ],
  ARS: [
    6.69, 6.68, 6.62, 6.58, 6.5, 6.51, 6.6, 6.59, 6.6, 6.52, 6.46, 6.43, 6.47,
    6.41, 6.4, 6.38, 6.36, 6.26, 6.27, 6.27, 6.24, 6.24, 6.25, 6.2, 6.26,
  ],
  IDR: [
    0.0863, 0.0866, 0.0858, 0.0853, 0.0848, 0.0846, 0.0855, 0.0856, 0.0858,
    0.0851, 0.0848, 0.0847, 0.0853, 0.085, 0.0852, 0.0852, 0.0852, 0.0839,
    0.0851, 0.0858, 0.086, 0.0862, 0.0866, 0.0864, 0.0879,
  ],
}

const countries = [
  { countryCode: 'IDR', countryName: 'Indonesia' },
  { countryCode: 'PHP', countryName: 'Philippines' },
  { countryCode: 'TRY', countryName: 'Turkiye' },
  { countryCode: 'ARS', countryName: 'Argentina' },
  { countryCode: 'INR', countryName: 'INDIA' },
]

const currencyData = []

const formatDate = (date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd}`
}

const startDate = new Date('2023-02-28')
const endDate = new Date('2023-04-04')
const dates = []

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const day = d.getDay()
  if (day !== 0 && day !== 6 && formatDate(d) !== '2023-03-01') {
    dates.push(new Date(d))
  }
}

dates.forEach((date, dateIndex) => {
  countries.forEach((country, countryIndex) => {
    const currencyCode = country.countryCode

    if (
      currencyValues[currencyCode] &&
      currencyValues[currencyCode][dateIndex]
    ) {
      currencyData.push({
        countryIndex: countryIndex + 1,
        currencyValue: currencyValues[currencyCode][dateIndex],
        currencyDate: formatDate(new Date(date)),
      })
    }
  })
})

module.exports = currencyData
