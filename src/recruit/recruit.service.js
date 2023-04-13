class RecruitService {
  constructor({ recruitRepository }) {
    this.recruitRepository = recruitRepository
  }
  // 전체게시물 정보 가져오기
  async getAllRecruit(start, limit) {
    try {
      const response = await this.recruitRepository.getAllRecruit(start, limit)
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
  async getHiddenRecruit(hidden, start, limit) {
    try {
      const response = await this.recruitRepository.getHiddenRecruit(
        hidden,
        start,
        limit
      )
      return response
    } catch (e) {
      console.log(`this error getHiddenRecruit in Service : `, e)
      throw new Error(e)
    }
  }
  // 플랫폼별 게시물 가져오기
  async getPlatformRecruit(platformName, start, limit) {
    try {
      const response = await this.recruitRepository.getPlatformRecruit(
        platformName,
        start,
        limit
      )
      console.log(`this code is response in Service : `, response)
      return response
    } catch (e) {
      console.log(`this error getAllRecruit in Service : `, e)
      throw new Error(e)
    }
  }

  // 게시물 등록하기
  async createRecruit(data) {
    try {
      const response = await this.recruitRepository.createRecruit(data)
      console.log(`this code is response in Service : `, response)
      return response
    } catch (e) {
      console.log(`this error createRecruit in Service : `, e)
      throw new Error(e)
    }
  }

  async joinMember(recruitIndex, userIndex) {
    try {
      const response = await this.recruitRepository.joinMember({
        recruitIndex,
        userIndex,
      })
      return response
    } catch (e) {
      console.log(`this error joinMember in Service : `, e)
      throw new Error(e)
    }
  }

  async checkMember({ userIndex }) {
    try {
      const response = await this.recruitRepository.checkMember({
        userIndex,
      })
      console.log(`test console.log in checkMember in Service: `, response)
      return response
    } catch (e) {
      console.log(`this error checkMember in Service : `, e)
      throw new Error(e)
    }
  }
  async updateRecruit(data) {
    try {
      const response = await this.recruitRepository.updateRecruit(data)
      return response
    } catch (e) {
      console.log(`this error updateRecruit in Service : `, e)
      throw new Error(e)
    }
  }
}

module.exports = RecruitService
