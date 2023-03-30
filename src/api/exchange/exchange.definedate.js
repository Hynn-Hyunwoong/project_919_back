const dateForm = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = new Date()
const oneMonth = new Date()
oneMonth.setMonth(today.getMonth() - 1)

const getDateRange = () => {
  let dates = []
  for (
    let date = new Date(oneMonth);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(dateForm(date))
  }
  return dates
}

module.exports = getDateRange()
