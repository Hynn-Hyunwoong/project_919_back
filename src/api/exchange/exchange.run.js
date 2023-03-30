const schedule = require('node-schedule') // Node-Scheduler
const getCurrency = require('./exchange.function')

module.exports = schedule.scheduleJob('30 9 * * *', getCurrency)
