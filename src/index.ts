// import { Server } from './server'
import * as express from "express";

// let server = new Server().app;
const app = express();
let port = 4000;

app.get('/', (req,res) => {
    res.send('First Route added')
})
app.get('/new', (req,res) => {
    res.send('new First Route added')
})

app.listen(port, () => {
    console.log('server is running at port 6000');

});

