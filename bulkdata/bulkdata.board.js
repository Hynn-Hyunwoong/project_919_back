const { sequelize } = require('../models')
const { User } = sequelize.models

const boardData = async () => {
  const users = await User.findAll()
  const now = new Date()
  const boarddata = []
  for (const user of users) {
    for (const category of ['0001', '0002']) {
      const subject = `테스트게시물 ${user.userId} & ${category}`
      const content = `테스트 컨텐츠 ${user.userId} 카테고리 ${category} 생성시점 ${now}`

      boarddata.push({
        subject,
        content,
        hit: 0,
        category,
        userIndex: user.userIndex,
      })
    }
  }
  return boarddata
}

module.exports = boardData
