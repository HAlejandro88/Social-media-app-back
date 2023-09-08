const usersResolvers = require('./user.resolver')
const postResolvers = require('./post.resolver')
const commentResolvers = require('./comments.resolver')

const resolvers = {
    Query: {
        ...usersResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}


module.exports = resolvers