import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// socket.io
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

import { AppComponent } from './app.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3700',
  options: {}
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
