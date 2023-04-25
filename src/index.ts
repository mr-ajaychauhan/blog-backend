import 'reflect-metadata';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './Resolvers/Task';
import { HelloResolver } from './Resolvers/HelloResolver';


const main = async () => {

    const schema = await buildSchema({
        resolvers: [HelloResolver,TaskResolver],
        validate:false,
    });

    const apolloServer = new ApolloServer({ schema });

    await apolloServer.start()

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    })
}

main();
