const { sequelize } = require('../models')
const { Recruit, User } = sequelize.models

const recruitCommentData = async () => {
  const recruits = await Recruit.findAll()
  const users = await User.findAll()
  const now = new Date()

  const recruitCommentData = []

  for (const recruit of recruits) {
    const randomCommentCount = Math.floor(Math.random() * 4) + 1

    for (let i = 0; i < randomCommentCount; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length)
      const randomUser = users[randomUserIndex]

      recruitCommentData.push({
        content: `댓글은 ${randomUser.userId}님의 ${recruit.title}입니다.`,
        recruitIndex: recruit.recruitIndex,
        userIndex: randomUser.userIndex,
      })
    }
  }

  return recruitCommentData
}

module.exports = recruitCommentData
