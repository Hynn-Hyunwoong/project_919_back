const dotenv = require('dotenv').config({ path: '../../.env' })

class recruitService {
  constructor({ recruitRepository }) {
    this.recruitRepository = recruitRepository
  }

  async getPlatform() {
    try {
      const result = await this.recruitRepository.platform()
      const platformName = result.map((v) => v.platformName)
      // console.log(platformName)
      //[ 'Youtube', 'Netflix', 'DisneyPlus', 'Watcha', 'Tving', 'Wavve' ]
      return platformName
    } catch (e) {
      console.log(
        `This error occurring in Service in platfromName method: ${e}`
      )
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
