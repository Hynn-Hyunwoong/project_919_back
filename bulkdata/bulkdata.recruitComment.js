const { sequelize } = require('../models')
const { Recruit, User } = sequelize.models

const recruitCommentData = async () => {
  const recruits = await Recruit.findAll()
  const users = await User.findAll()
  const now = new Date()

  const recruitCommentData = []
  for (const recruit of recruits) {
    for (const user of users) {
      recruitCommentData.push({
        content: `댓글은 ${user.userId}님의 ${recruit.title}입니다.`,
        recruitIndex: recruit.recruitIndex,
        userId: user.userId,
      })
    }
  }
  return recruitCommentData
}

module.exports = recruitCommentData
