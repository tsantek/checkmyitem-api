const jwt = require('jsonwebtoken')
const Cookies = require('cookies')

const currentUser = (req, res, next) => {
    const token = new Cookies(req, res).get('accessToken')
    // check if there is token
    if (!token) {
        return next();
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN)
        req.currentUser = payload
    } catch (err) { }
    next();
}

module.exports = currentUser