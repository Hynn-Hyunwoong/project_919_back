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

  async getResult(req, res, next) {
    try {
      const keyword = req.params.id
      const result = await this.searchService.getResult(keyword)
      res.status(200).json(result)
      // console.log(result)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = SearchController
