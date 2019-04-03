import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { log } from 'util';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario:Usuario = new Usuario('');

  constructor(private socketService:Socket,private _router:Router) {
    this.checkStatus();
    this.cargarStorage();
   }

   cargarStorage(){
     if(localStorage.getItem("usuario")){
       this.usuario.nombre = JSON.parse(localStorage.getItem("usuario")).nombre;
       this.loginWs(this.usuario.nombre);
     }
   }
   //* Verifica el estado del socket - si se encuentra conectado o desconectado
  checkStatus(){
    this.socketService.on("connect",()=>{
       console.log("Conectado al Servidor con socket");
       this.socketStatus = true;  
    });
    this.socketService.on("disconnect",()=>{
       console.log("Desconectado del Servidor con socket");
         this.socketStatus = false;
    });
  }
  
  //* Se coloca el nombre en un string, el nombre del evento se recibe por la función
  emitir(evento:string, payload?:any){
    //* payload es el contenido del evento a emitir
    //* La funcion que emite el evento es "emit() de socketService"
    this.socketService.emit(evento,payload);
  }

  escuchar(evento:string){
    //* Retorna un observable
    return this.socketService.fromEvent(evento);
  }

  /**
   * (esto se hace con slash y dos asteriscos)
   * Funcion que guarda al usuario en el localStorage
   * @param nombre el nombre del usuario que esta 
   * iniciando sesion 
   */
  loginWs(nombre:string){
    console.log("Configurando al usuario",nombre);
    this.usuario = new Usuario(nombre);
    this.emitir("configurar-usuario",this.usuario);
    this.guardarStorage();
    
  } 
  loignFB(nombre:string){
    console.log("Configurando al usuario",nombre);
    this.usuario = new Usuario(nombre);
    this.emitir("configurar-usuario",this.usuario);
  }

  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  cerrarSesion(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    this._router.navigateByUrl("/");
    this.emitir('cerrar-sesion');
  }
}


