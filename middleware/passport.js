const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const KakaoStrategy = require('passport-kakao').Strategy

const config = require('../.git')

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: config.naver.clientID,
        clientSecret: config.naver.clientSecret,
        callbackURL: config.naver.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { email, nickname } = profile._json
      }
    )
  )
}
