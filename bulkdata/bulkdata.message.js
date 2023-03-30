const { sequelize } = require('../models')
const { User, Recruit, ottPlan, Member, Message } = sequelize.models

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getRandomMessage = () => {
  const messages = [
    '안녕하세요!',
    '오늘 날씨가 좋네요.',
    '영화 보러 가고 싶어요.',
    '어떤 음식을 좋아하세요?',
    '주말에 뭐할까요?',
    '좋은 아이디어 있어요?',
    '오늘 점심은 뭐 먹었어요?',
    '여행 가고 싶어요.',
    '좋아하는 취미가 뭐에요?',
    '다음 모임 언제인가요?',
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

const messageData = async () => {
  try {
    const users = await User.findAll()
    const recruits = await Recruit.findAll()
    const plans = await ottPlan.findAll()
    const messageData = []

    console.log('Users:', users.length)
    console.log('Recruits:', recruits.length)
    console.log('Plans:', plans.length)

    // ... (The rest of the messageData function code)

    // Add this code after creating the Member data
    for (const recruit of recruits) {
      const members = await Member.findAll({
        where: { RecruitIndex: recruit.recruitIndex },
        include: { model: sequelize.models.User, as: 'User' }, // Modify this line to include the User model correctly
      })

      for (const member of members) {
        const messagesToCreate = []

        for (let i = 0; i < 10; i++) {
          messagesToCreate.push({
            content: getRandomMessage(),
            userIndex: member.User.userIndex, // Modify this line to use the userIndex from the User model
            recruitIndex: recruit.recruitIndex,
          })
        }

        try {
          await sequelize.transaction(async (t) => {
            await Message.bulkCreate(messagesToCreate)
          })
        } catch (err) {
          console.error('Transaction failed:', err)
        }
      }
    }

    console.log('Message data:', messageData.length)
    return messageData
  } catch (e) {
    console.log(e)
    return []
  }
}

module.exports = messageData
