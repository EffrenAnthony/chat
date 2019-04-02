
import express from "express";
import http from "http";
import socketIO from "socket.io";
import { Usuarios } from "./usuarios";
import { Usuario } from "./usuario";

export default class Server{
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;
    public usuariosConectados:Usuarios = new Usuarios();

    constructor(){
        this.app = express();
        //* Se le entrega la configuracion de express y se inicializa usando http Server
        this.httpServer = new http.Server(this.app);
        //* Los sockets se van a basar en la configuracion del http
        this.io = socketIO(this.httpServer);
        //* Se le indica que tome un puerto - recibe un numero de puerto o se le asigna el puerto 3700
        this.puerto = process.env.port || 8080;
        this.escucharSocket();
    }

    start(){
        //* Ejecuta el servidor WEB
        this.httpServer.listen(this.puerto, ()=>console.log("Servidor iniciado correctamente"));
    }

    //* Funcion encargada de escuchar
    escucharSocket(){
        console.log("Escuchando Sockets"); 
        //* Io es la instancia de socket. Cuando alguien se conecte se ejecuta una función.
        //? Recibe un cliente. Son muchos atributos, solo seleccionamos el id, que se genera con cada conexion.
        //! La funcion on sirve para escuchar
        this.io.on('connect', (cliente)=>{
            console.log(`${cliente.id} se ha conectado`);
            let usuario = new Usuario(cliente.id);
            this.usuariosConectados.agregar(usuario);
            console.log("Lista de usuarios");
            console.log(this.usuariosConectados.getLista());         

            

            //? Se evalua la conexion del cliente, en caso se desconecte manda un mensaje
            cliente.on('disconnect',()=>{
                console.log(`${cliente.id} se ha desconectado`);
            });
            //! El nombre del evento de back debe de coincidir con el nombre de evento de front
            cliente.on('enviar-mensaje',(payload)=>{
                this.io.emit('mensaje-nuevo',payload);
                console.log(payload);
            })

            cliente.on("configurar-usuario",(usuario)=>{
                this.usuariosConectados.actualizarNombre(cliente.id,usuario.nombre);
                console.log(this.usuariosConectados.getLista());
                
            })
        })
    }
}