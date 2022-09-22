import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuillModule } from 'ngx-quill';
import { SocketioService } from './socketio.service';
// const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, QuillModule.forRoot(), HttpClientModule],
  declarations: [AppComponent, HelloComponent],
  providers: [SocketioService],
  bootstrap: [AppComponent],
})
export class AppModule { }
