import 'reflect-metadata';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Query, Resolver, buildSchema } from 'type-graphql'

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello Ajay Chauhan";
    }
}
const main = async () => {

    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({ schema });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000");
    })
}

main();
