const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server')



module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECREET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Exprired token')
            }
        }
    
        throw new Error('Authentication token must be \' Bearer [token] ')
    }

    throw new Error('Authentication header must be provided')


}