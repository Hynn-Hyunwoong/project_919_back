const { sequelize } = require('../models')
const { User, ottPlan } = sequelize.models

const recruitData = async () => {
  const users = await User.findAll()
  const plans = await ottPlan.findAll()
  const now = new Date()

  const recruitData = []

  for (const user of users) {
    const randomPostCount = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < randomPostCount; i++) {
      const randomPlanIndex = Math.floor(Math.random() * plans.length)
      const randomPlan = plans[randomPlanIndex]

      recruitData.push({
        title: `모집게시물은 ${user.userId}님의 ${randomPlan.planName}입니다.`,
        content: `이 상세사항은 ${user.userId}님의 ${randomPlan.planName}입니다.`,
        openChatLink: `https://open.kakao.com/o/sample`,
        startDate: now,
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7),
        userIndex: user.userIndex,
        ottPlanIndex: randomPlan.ottPlanIndex,
      })
    }
  }

  return recruitData
}

module.exports = recruitData
