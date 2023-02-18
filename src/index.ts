import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';


async function startApolloServer() {

    const typeDefs = gql`
        type Query {
            hello: String
            }
    `;
    // // Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
        },
    };
    // Same ApolloServer initialization as before
    const server = new ApolloServer({ typeDefs, resolvers });

    // Required logic for integrating with Express
    await server.start();

    const app = express();

    server.applyMiddleware({
        app,
        path: '/'
    });

    // Modified server startup
    await new Promise((resolve) => app.listen({ port: 4000 }));
    console.log(`🚀 Server ready at http://localhost:4000${server}`);
    console.log(server);
    
}
startApolloServer()




///apolo 5 yrar ago start server methods

// import "reflect-metadata";
// import { ApolloServer } from "apollo-server-express";
// import * as Express from "express";
// import { Query, Resolver, buildSchema } from "type-graphql";

// @Resolver()
// class HelloResolver {
//   @Query(() => String , {name:'helloWorld'})
//   async hello() {
//     return "Hello World!";
//   }
// }


// const main = async () => {
//   const schema = await buildSchema({
//     resolvers: [HelloResolver]
//   });

//   const apolloServer = new ApolloServer({ schema });

//   const app = Express();

//   apolloServer.applyMiddleware({ app });

//   app.listen(4000, () => {
//     console.log("server started on http://localhost:4000/graphql");
//   });
// };

// main();




// // import { Server } from './server'
// import * as express from "express";

// // let server = new Server().app;
// const app = express();
// let port = 4000;

// app.get('/', (req,res) => {
//     res.send('First Route added')
// })
// app.get('/new', (req,res) => {
//     res.send('new First Route added')
// })

// app.listen(port, () => {
//     console.log('server is running at port 6000');

// });

