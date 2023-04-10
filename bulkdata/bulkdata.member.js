const { sequelize } = require('../models')
const { User, Recruit, ottPlan, Member } = sequelize.models

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const memberData = async () => {
  const users = await User.findAll()
  const recruits = await Recruit.findAll()
  const plans = await ottPlan.findAll()
  const MemberData = []

  console.log('Users:', users.length)
  console.log('Recruits:', recruits.length)
  console.log('Plans:', plans.length)

  for (const recruit of recruits) {
    const plan = plans.find((p) => p.ottPlanIndex === recruit.ottPlanIndex)
    const limit = plan ? plan.limit : 0

    // Check the current number of members for the recruitIndex
    const currentMembers = await Member.findAll({
      where: { recruitIndex: recruit.recruitIndex },
    })

    console.log(
      `Recruit ${recruit.recruitIndex} current members:`,
      currentMembers.length
    )

    // Exclude users already in the currentMembers
    const availableUsers = users.filter(
      (user) => !currentMembers.find((cm) => cm.userIndex === user.userIndex)
    )

    console.log(
      `Recruit ${recruit.recruitIndex} available users:`,
      availableUsers.length
    )

    const membersToCreate = []

    while (membersToCreate.length < limit) {
      const randomUser =
        availableUsers[Math.floor(Math.random() * availableUsers.length)]

      if (!membersToCreate.some((m) => m.UserIndex === randomUser.userIndex)) {
        membersToCreate.push({
          userIndex: randomUser.userIndex,
          recruitIndex: recruit.recruitIndex,
        })
      }
    }

    console.log(
      `Recruit ${recruit.recruitIndex} members to create:`,
      membersToCreate.length
    )

    if (membersToCreate.length > 0) {
      try {
        await sequelize.transaction(async () => {
          const createdMembers = await Member.bulkCreate(membersToCreate, {
            ignoreDuplicates: true,
            updateOnDuplicate: ['userIndex', 'recruitIndex'],
          })
          MemberData.push(...createdMembers.map((m) => m.dataValues))
        })
      } catch (err) {
        console.error('Transaction failed:', err)
      }
    }
  }

  for (const recruit of recruits) {
    const memberCount = await Member.count({
      where: { recruitIndex: recruit.recruitIndex },
    })
    console.log(
      `Recruit ${recruit.recruitIndex} final member count:`,
      memberCount
    )
    if (memberCount >= recruit.limit) {
      recruit.hidden = true
      await recruit.save()
    }
  }

  console.log('Member data:', MemberData.length)
  return MemberData
}

module.exports = memberData
