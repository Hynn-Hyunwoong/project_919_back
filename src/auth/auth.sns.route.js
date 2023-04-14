const path = require('path')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../', '../', '.env'),
})
const express = require('express')
const router = express.Router()
const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const JWT = require('../../lib/jwt')
const crypto = require('crypto')
const SALT = require('../../config').SALT
const jwt = new JWT({ crypto })
const redirectPath = process.env.AXIOS_DOMAIN
router.get('/auth/naver', passport.authenticate('naver'))
router.get('/auth/naver/callback', async (req, res, next) => {
  passport.authenticate('naver', async (e, user, info) => {
    if (e) {
      return next(e)
    }
    if (!user) {
      return res.redirect('/login')
    }
    const token = jwt.Sign({ userId: user.userId }, String(SALT), {
      expiresIn: '1h',
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    res.redirect(`${redirectPath}?token=${token}`)
  })(req, res, next)
})

router.get('/auth/kakao', passport.authenticate('kakao'))
router.get('/auth/kakao/callback', async (req, res, next) => {
  passport.authenticate('kakao', async (e, user, info) => {
    if (e) {
      return next(e)
    }
    if (!user) {
      return res.redirect('/login')
    }
    const token = jwt.Sign({ userId: user.userId }, String(SALT), {
      expiresIn: '1h',
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    res.redirect(`${redirectPath}?token=${token}`)
  })(req, res, next)
})

module.exports = router
