import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  div:any;
  mensaje:string = "";
  constructor(private _swebSocket: WebsocketService) { }

  ngOnInit() {
    this.div = document.getElementById('mensajes');
    this._swebSocket.escuchar('mensaje-nuevo').subscribe((mensaje:string)=>{
      let p = document.createElement("p");
      p.innerHTML = mensaje;
      this.div.appendChild(p);
    })
  }

  enviar(){
    console.log("Enviando mensaje...");
    //* La primera parte es el nombre del evento (debe coincidir en front y back), la segunda parte es el payload.
    this._swebSocket.emitir('enviar-mensaje',this.mensaje);
    this.mensaje = "";
  }

}