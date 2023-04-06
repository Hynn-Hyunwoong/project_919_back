class LikeController {
  constructor({ likeService }) {
    this.likeService = likeService
  }
  //Like 조회
  async getLikeCount(req, res, next) {
    try {
      const { recruitIndex } = req.body
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
}

module.exports = LikeController
