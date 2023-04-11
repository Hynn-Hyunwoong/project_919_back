class SearchController {
  constructor({ searchService }) {
    this.searchService = searchService
  }
  // 전체 게시물 가져오기
  // async getAllRecruit(req, res, next) {
  //   try {
  //     const response = await this.searchService.getAllRecruit()
  //     res.status(200).json(response)
  //   } catch (e) {
  //     console.log(e)
  //     res.status(500).json({ message: 'Internal Server Error' })
  //   }
  // }
}

module.exports = SearchController
