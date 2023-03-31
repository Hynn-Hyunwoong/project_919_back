const JWT = require('../lib/jwt')
const jwt = new JWT({ crypto: require('crypto') })

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.Verify(token)
    req.user = decoded
    next()
  } catch (e) {
    console.log(`This error occurring in authenticateToken: ${e}`)
    res.sendStatus(403)
  }
}

module.exports = authenticateToken
