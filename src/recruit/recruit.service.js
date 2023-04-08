class RecruitService {
  constructor({ recruitRepository }) {
    this.recruitRepository = recruitRepository
  }

  async getAllRecruit() {
    try {
      const response = await this.recruitRepository.getAllRecruit()
      return response
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

module.exports = RecruitService
