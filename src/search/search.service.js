class SearchService {
  constructor({ searchRepository }) {
    this.searchRepository = searchRepository
  }
  // 전체게시물 정보 가져오기
  // async getAllRecruit() {
  //   try {
  //     const response = await this.recruitRepository.getAllRecruit()
  //     return response
  //   } catch (e) {
  //     console.log(e)
  //     throw new Error(e)
  //   }
  // }
}

module.exports = SearchService
