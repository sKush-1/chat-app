import {Server} from "socket.io"
import http from "http"
import express from "express"
import cors from "cors"
import { log } from "console";
const app  = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST' ],
    }
});


io.on('connection', (socket)=> {
    console.log('User connected', socket.id);
    
})

export {app,io,server}