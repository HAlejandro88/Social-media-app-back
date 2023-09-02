const jwt = require('jsonwebtoken')

const getToken = user => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECREET_KEY, {expiresIn: '1h'})
}



module.exports = getToken