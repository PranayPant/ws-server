import express, {Application, Request, Response} from 'express';
import http from 'http';
import WebSocket, {AddressInfo, ClientOptions} from 'ws';

import connect from './api/connect'

const app:Application = express();

// health check route
app.get('/', (req: Request, res: Response ) =>{
    res.status(200);
    res.send('Health check pass');
    res.end();
})

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket, request: Request, client: ClientOptions) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
        connect(JSON.parse(message))
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server.');
});

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});