import express from 'express';
import http from 'http';
import socketIO from 'socket.io'
export default class Server {

    public app:express.Application;
    public puerto: any;
    public httpServer: http.Server;
    public io:socketIO.Server;

    constructor(){
        this.app = express();
        // se le entrega la configuracion de express u se inicializa usando http server
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.puerto = process.env.port || 3700;
    }

    start(){
        // ejecuta el servidor web
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor iniciado correctamente =) puerto => " + this.puerto);            
        });
    }
}