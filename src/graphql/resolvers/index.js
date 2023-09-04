const usersResolvers = require('./user.resolver')
const postResolvers = require('./post.resolver')

const resolvers = {
    Query: {
        ...usersResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation
    }
}


module.exports = resolvers