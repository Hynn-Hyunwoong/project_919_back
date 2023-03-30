const { sequelize } = require('../models')
const { Board, User } = sequelize.models

const RandomComment = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const boardCommentData = async () => {
  const boards = await Board.findAll()
  const users = await User.findAll()
  const now = new Date()
  const boardcommentData = []

  for (const board of boards) {
    const numComment = RandomComment(1, 20)
    for (let i = 0; i < numComment; i++) {
      const user = users[RandomComment(0, users.length - 1)]
      const content = `이 내용은 테스트용으로 작성되었습니다. 작성자는 ${user.userId} 이며, 게시물 번호는 ${board.boardIndex} 입니다. 생성시점은 ${now} 입니다.`

      boardcommentData.push({
        content,
        userIndex: user.userIndex,
        boardIndex: board.boardIndex,
      })
    }
  }
  return boardcommentData
}
module.exports = boardCommentData
