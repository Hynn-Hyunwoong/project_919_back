const userData = []
for (let i = 01; i <= 20; i++) {
  userData.push({
    userId: `user${i}@.user.com`,
    userPw: '12341234',
    userNick: `userNick${i}`,
    phone: `0101234123${i}`,
    verified: true,
    picture: null,
    phoneVerificationCode: null,
    phoneVerificationExpiry: null,
  })
}

module.exports = userData
