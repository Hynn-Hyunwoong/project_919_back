const {
  sequelize: {
    models: { Recruit, User },
  },
} = require('../../models')

const { sequelize, Sequelize } = require('../../models')

const SearchRepository = require('./search.repository')
const SearchService = require('./search.service')
const SearchController = require('./search.controller')

const searchRepository = new SearchRepository({
  Recruit,
  User,
  sequelize,
  Sequelize,
})
const searchService = new SearchService({ searchRepository })
const searchController = new SearchController({ searchService })

module.exports = { searchController }
