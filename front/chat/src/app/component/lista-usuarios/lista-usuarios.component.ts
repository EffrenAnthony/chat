import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styles: []
})
export class ListaUsuariosComponent {

  public usuariosConectados:any = [];

  constructor(private _sWebsocket:WebsocketService,_router:Router) { 
    this.obtenerUsuariosConectados();
  }


  obtenerUsuariosConectados() {
    this._sWebsocket.emitir('obtener-usuarios');
    this._sWebsocket.escuchar('usuarios-activos').subscribe((listaUsuarios)=>{
    this.usuariosConectados = listaUsuarios;
    });
  }

  cerrarSesion(){
    this._sWebsocket.cerrarSesion();
  }



}