import express from 'express'
import { config } from 'dotenv'
import { connectToDatabase } from './utils/connection'
import { graphqlHTTP } from 'express-graphql'
import schema from './handlers/handlers'
//Dot ENV call
config()
const app = express()

//graphql init
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))

connectToDatabase().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Start on http://localhost:${process.env.PORT}/graphql`);
    });
}).catch((err) => {
    console.log(err);
})
