import 'reflect-metadata';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './Resolvers/Task';
import { HelloResolver } from './Resolvers/HelloResolver';
import { DataSource } from 'typeorm';
import { Task } from './entities/Task';


const main = async () => {

    const conncection = new DataSource({
        type: 'postgres',
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "112233",
        database: 'postgres',
        entities:[Task],
        synchronize:true,
        
    })

    conncection.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const schema = await buildSchema({
        resolvers: [HelloResolver, TaskResolver],
        validate: false,
    });

    const apolloServer = new ApolloServer({
        schema,
        plugins: []
    });

    await apolloServer.start()

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    })
}

main();
