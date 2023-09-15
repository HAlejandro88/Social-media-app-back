require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { createServer } = require('http');
const typeDefs = require('./graphql/typesDefs')
const resolvers = require('./graphql/resolvers/index')


const connectMongoDB = require('./config/db')

const pubsub = new PubSub();


//const httpServer = createServer();
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => ({req, pubsub}),
    //plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})



server.listen({port: 5000})
    .then(async (res) => {
        //server.applyMiddleware({ app: httpServer });
        console.log(`Server listening on ${res.url}`)
        await connectMongoDB() 
    })
    .catch(error => console.error('error',error))


