class LikeController {
  constructor({ likeService }) {
    this.likeService = likeService
  }
  //Like 조회
  async getLikeCount(req, res, next) {
    try {
      const { recruitIndex } = req.params
      const like = await this.likeService.getLikeCount(recruitIndex)
      res.status(200).json(like)
    } catch (e) {
      console.log(
        `This error occurring in Controller in getLikeCount method: ${e}`
      )
      next(e)
    }
  }

  //Like 추가/제거
  async clickLike(req, res, next) {
    try {
      const { userIndex, recruitIndex } = req.body
      const like = await this.likeService.clickLike(userIndex, recruitIndex)
      res.status(200).json(like)
    } catch (e) {
      console.log(
        `This error occurring in Controller in clickLike method: ${e}`
      )
      next(e)
    }
  }

  // userIndex 에 해당하는 Like 게시물 확인

  async getUserLike(req, res, next) {
    try {
      const userIndex = req.params.userIndex
      if (!userIndex) {
        return res.status(400).json({ message: 'userIndex is required' })
      }
      const likePots = await this.likeService.getUserLike(userIndex)
      console.log(`test to likePots`, likePots)
      return res.status(200).json(likePots)
    } catch (e) {
      console.log(
        `This error occurring in Controller in getUserLike method: ${e}`
      )
      next(e)
    }
  }
}

module.exports = LikeController
