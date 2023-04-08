class RecruitService {
  constructor({ recruitRepository }) {
    this.recruitRepository = recruitRepository
  }
  // 전체게시물 정보 가져오기
  async getAllRecruit() {
    try {
      const response = await this.recruitRepository.getAllRecruit()
      return response
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  // 1게시물 가져오기
  async getOneRecruit(recruitIndex) {
    try {
      const response = await this.recruitRepository.getOneRecruit(recruitIndex)
      return response
    } catch (e) {
      console.log(`this error getOneRecruit in Service : `, e)
      throw new Error(e)
    }
  }
  // Hidden 게시물 가져오기
  async getHiddenRecruit(hidden) {
    try {
      const response = await this.recruitRepository.getHiddenRecruit(hidden)
      return response
    } catch (e) {
      console.log(`this error getHiddenRecruit in Service : `, e)
      throw new Error(e)
    }
  }
  // 플랫폼별 게시물 가져오기
  async getAllRecruit(platformName) {
    try {
      const response = await this.recruitRepository.getAllRecruit(platformName)
      console.log(`this code is response in Service : `, response)
      return response
    } catch (e) {
      console.log(`this error getAllRecruit in Service : `, e)
      throw new Error(e)
    }
  }
}

module.exports = RecruitService
