class LikeRepository {
  constructor({ Like, User, recruit, sequelize, Sequelize }) {
    this.Like = Like
    this.User = User
    this.Recruit = recruit
    this.sequelize = sequelize
    this.Sequelize = Sequelize
  }
  // Like 통계
  async getLikeCount(recruitIndex) {
    try {
      const like = await this.Like.count({
        where: { recruitIndex },
      })
      return like
    } catch (e) {
      console.log(
        `This error occurring in Repository in getLikeCount method: ${e}`
      )
      throw new Error(e)
    }
  }
  // Like 검색
  async findLike(userIndex, recruitIndex) {
    try {
      const like = await this.Like.findOne({
        raw: true,
        where: { userIndex, recruitIndex },
      })
      return like
    } catch (e) {
      console.log(`This error occurring in Repository in findLike method: ${e}`)
      throw new Error(e)
    }
  }
  // Like 추가
  async addLike(userIndex, recruitIndex) {
    try {
      const like = await this.Like.create(
        { userIndex, recruitIndex },
        { raw: true }
      )
      return like
    } catch (e) {
      console.log(`This error occurring in Repository in addLike method: ${e}`)
      throw new Error(e)
    }
  }
  // Like 삭제
  async removeLike(userIndex, recruitIndex) {
    try {
      const like = await this.Like.destroy({
        where: { userIndex, recruitIndex },
      })
      return like
    } catch (e) {
      console.log(
        `This error occurring in Repository in removeLike method: ${e}`
      )
      throw new Error(e)
    }
  }
}

module.exports = LikeRepository
