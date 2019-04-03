
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
            // Creo un usuario con el id de la maquina de la que se conecta
            let usuario = new Usuario(cliente.id);
            // agrego el usuario recientemente conectado a la lista de usuarios
            this.usuariosConectados.agregar(usuario);
            // emitir el evento 'usuarios-activos' enviando todos
            // los usuarios activos a quien esten suscritos
            this.io.emit('usuarios-activos',this.usuariosConectados.getLista())
            console.log("Lista de usuarios");
            console.log(this.usuariosConectados.getLista());         

            

            //? Se evalua la conexion del cliente, en caso se desconecte manda un mensaje
            cliente.on('disconnect',()=>{
                // borro el usuario de la lista de usuarios conectados
                // cuando este se desconecta
                console.log(`${cliente.id} se ha desconectado`);
                this.usuariosConectados.borrarUsuario(cliente.id)
                // emito el evento 'usuarios-activos' para que todos vean
                // la nueva lista de usuarios activos
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista())
            });
            //! El nombre del evento de back debe de coincidir con el nombre de evento de front
            cliente.on('enviar-mensaje',(payload)=>{
                this.io.emit('mensaje-nuevo',payload);
                console.log(payload);
            });

            cliente.on("configurar-usuario",(usuario)=>{
                this.usuariosConectados.actualizarNombre(cliente.id,usuario.nombre);
                console.log(this.usuariosConectados.getLista());
                
            });

            cliente.on('obtener-usuarios',()=>{
                // this.io.emit('usuarios-activos,this.usuarios Conectados.getLista());
                // this.io.in(id)=> emite un socket para un cliente especifico
                // dado su id
                // envia la lista de usuarios
                this.io.in(cliente.id).emit('usuarios-activos',this.usuariosConectados.getLista());
                console.log("alguien se ha conectado a la salita");
                
            
            });
            cliente.on('cerrar-sesion',()=>{
                this.usuariosConectados.actualizarNombre(cliente.id,"sin-nombre");
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
            });
        });
    }
}