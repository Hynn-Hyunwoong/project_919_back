class userRepository {
  constructor({ User, sequelize, Sequelize }) {
    this.User = User
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }

  // ID 중복 체크
  async userIdChecker({ userId }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userId,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in userIdChecker method: ${e}`
      )
      throw new Error(e)
    }
  }
  // Phone 중복 체크
  async checkPhone({ phone }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          phone,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in checkPhone method: ${e}`
      )
      throw new Error(e)
    }
  }

  // User 가입
  async userAdd(payload) {
    try {
      const user = await this.User.create(payload, { raw: true })
      return user
    } catch (e) {
      console.log(`This error occurring in Repository in addUser method: ${e}`)
      throw new Error(e)
    }
  }

  // User 로그인

  async userLogin({ userId, userPw }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userId,
          userPw,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in userLogin method: ${e}`
      )
      throw new Error(e)
    }
  }

  // User 정보 불러오기

  async getUserInfo({ userId }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userId,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in getUserInfo method: ${e}`
      )
      throw new Error(e)
    }
  }

  // 회원정보 수정을 위한 아이디 정보로 정보 가져오기
  async getUserById({ userId }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userId,
        },
      })
      return user
    } catch (e) {
      console.log(
        `This error occurring in Repository in getUserById method: ${e}`
      )
      throw new Error(e)
    }
  }
  // User 정보 수정
  async userUpdate({ userId, userData }) {
    try {
      const updateResult = await this.User.update(userData, {
        where: { userId },
        returning: true,
        row: true,
      })

      if (updateResult[0] === 0) {
        throw new Error('User not found')
      }
      return updateResult[1][0]
    } catch (e) {
      console.log(
        `This error occurring in Repository in userUpdate method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = userRepository
