const config = require('../../config').naver
const Config = require('../../config').kakao
const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const KakaoStrategy = require('passport-kakao').Strategy
const { sequelize } = require('../../models')
const { User } = sequelize.models
const axios = require('axios')
const naverAuth = require('./auth.sns.model').naver
const kakaoAuth = require('./auth.sns.model').kakao

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// Naver
passport.use(
  new NaverStrategy(
    naverAuth,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userInfo = await axios.get(naverAuth.userProfileURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const { id, email, mobile, nickname, name, profile_image } =
          userInfo.data.response
        console.log(userInfo.data.response)
        const Mobile = userInfo.data.response.mobile.replace(/-/g, '')

        const existingUser = await User.findOne({
          where: { phone: Mobile },
        })

        if (existingUser) {
          return done(null, existingUser)
        } else {
          const newUser = await User.create({
            userId: email,
            userPw: '-',
            userNick: nickname,
            picture: profile_image,
            phone: Mobile,
          })

          return done(null, newUser)
        }
      } catch (e) {
        console.log(`This error occurring in NaverStrategy: ${e}`)
        return done(e, null)
      }
    }
  )
)

// Kakao
passport.use(
  new KakaoStrategy(
    kakaoAuth,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, properties, kakao_account } = profile._json
        console.log(profile._json)
        const email = kakao_account.email
        const nickname = properties.nickname
        const profile_image = properties.profile_image
        const existingUser = await User.findOne({
          where: { phone: id },
        })

        if (existingUser) {
          return done(null, existingUser)
        } else {
          const newUser = await User.create({
            userId: email,
            userPw: '-',
            userNick: nickname,
            picture: profile_image,
            phone: id,
          })

          return done(null, newUser)
        }
      } catch (e) {
        console.log(`This error occurring in KakaoStrategy: ${e}`)
        return done(e, null)
      }
    }
  )
)
