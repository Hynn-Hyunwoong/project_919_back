const config = require('../../config').naver
const Config = require('../../config').kakao

module.exports = {
  naver: {
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackUrl,
    authorizationURL: 'https://nid.naver.com/oauth2.0/authorize',
    tokenURL: 'https://nid.naver.com/oauth2.0/token',
    userProfileURL: 'https://openapi.naver.com/v1/nid/me',
  },
  kakao: {
    clientID: Config.ClientKey,
    clientSecret: Config.SecretKey,
    callbackURL: Config.CallbackURL,
  },
}
