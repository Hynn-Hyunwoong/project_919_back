class LikeService {
  constructor({ likeRepository }) {
    this.likeRepository = likeRepository
  }
  //Like 조희
  async getLikeCount(recruitIndex) {
    try {
      const like = await this.likeRepository.getLikeCount(recruitIndex)
      return like
    } catch (e) {
      console.log(
        `This error occurring in Service in getLikeCount method: ${e}`
      )
      throw new Error(e)
    }
  }

  // Like 추가/제거
  async clickLike(userIndex, recruitIndex) {
    try {
      const like = await this.likeRepository.findLike(userIndex, recruitIndex)

      if (like) {
        await this.likeRepository.removeLike(userIndex, recruitIndex)
        return { message: 'remove Like' }
      } else {
        await this.likeRepository.addLike(userIndex, recruitIndex)
        return { message: 'added Like' }
      }
      return
    } catch (e) {
      console.log(`This error occurring in Service in clickLike method: ${e}`)
      throw new Error(e)
    }
  }

  // userIndex 에 해당하는 Like 게시물 확인
  async getUserLike(userIndex) {
    try {
      const likePosts = await this.likeRepository.getUserLike(userIndex)
      return likePosts
    } catch (e) {
      console.log(`This error occurring in Service in getUserLike method: ${e}`)
      throw new Error(e)
    }
  }
}

module.exports = LikeService
