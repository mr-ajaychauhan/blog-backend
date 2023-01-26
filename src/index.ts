// import { Server } from './server'
import * as express from "express";

// let server = new Server().app;
const app = express();
let port = 6000;

app.listen(port, () => {
    console.log('server is running at port 6000');

});

