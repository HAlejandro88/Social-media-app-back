require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/typesDefs')
const resolvers = require('./graphql/resolvers/index')


const connectMongoDB = require('./config/db')


const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => ({req})
})



server.listen({port: 5000})
    .then(async (res) => {
        console.log(`Server listening on ${res.url}`)
        await connectMongoDB()
    })
    .catch(error => console.error('error',error))