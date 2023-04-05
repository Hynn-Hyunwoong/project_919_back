const dotenv = require('dotenv').config({ path: '../../.env' })

class recruitService {
  constructor({ recruitRepository }) {
    this.recruitRepository = recruitRepository
  }

  // 플랫폼 가져오기
  async getPlatform() {
    try {
      const platform = await this.recruitRepository.getPlatform()
      const platformName = platform.map((v) => v.platformName)
      // console.log(platformName)
      //[ 'Youtube', 'Netflix', 'DisneyPlus', 'Watcha', 'Tving', 'Wavve' ]
      return platformName
    } catch (e) {
      console.log(
        `This error occurring in Service in platfromName method: ${e}`
      )
      throw new Error(e)
    }
  }

  // 플랜 가져오기 -> ottname 넣어서 가져와야 해서 post로 요청했음!
  async postPlan(ottname) {
    try {
      const planList = await this.recruitRepository.postPlan(ottname)
      return planList
    } catch (e) {
      console.log(`This error occurring in Service in postPlan method: ${e}`)
      throw new Error(e)
    }
  }

  // // ID 중복 체크
  // async userIdChecker({ userId }) {
  //   try {
  //     const user = await this.userRepository.userIdChecker({ userId })
  //     return user ? { isAvailable: false } : { isAvailable: true }
  //   } catch (e) {
  //     console.log(
  //       `This error occurring in Service in userIdChecker method: ${e}`
  //     )
  //     throw new Error(e)
  //   }
  // }
}

module.exports = recruitService
