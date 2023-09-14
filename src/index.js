require('dotenv').config()
//const { ApolloServer } = require('apollo-server')
const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer } = require('@apollo/server/standalone')

const { createServer } = require('http')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } =  require('ws')
const { useServer } =  require('graphql-ws/lib/use/ws')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const { PubSub } = require('graphql-subscriptions')

const typeDefs = require('./graphql/typesDefs')
const resolvers = require('./graphql/resolvers/index')


const pubsub = new PubSub();


const httpServer = createServer();



const connectMongoDB = require('./config/db')

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

//console.log(serverCleanup);

//const httpServer = createServer();
const server = new ApolloServer({
    schema,
    context: ({req}) => ({req, pubsub}),
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
    
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
    ]
})

const start = async () => {
    await server.start()
    await connectMongoDB()
    httpServer.listen(5000,() => console.log(`server started in port 5000`))

    /*const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
    });

    connectMongoDB()

    console.log('server started in port ' + url)*/
}


start()



/*server.listen({port: 5000})
    .then(async (res) => {
        console.log(`Server listening on ${res.url}`)
        await connectMongoDB() 
    })
    .catch(error => console.error('error',error))*/


