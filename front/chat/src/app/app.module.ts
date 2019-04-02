import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//Enrutador
import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import {FooterComponent} from './component/footer/footer.component'
// import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './component/chat/chat.component';
import { MensajesComponent } from './component/mensajes/mensajes.component';
import { ListaUsuariosComponent } from './component/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './component/login/login.component';

const config:SocketIoConfig = {
  url:'http://localhost:8080',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    MensajesComponent,
    ListaUsuariosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }