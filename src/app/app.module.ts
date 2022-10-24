import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HelloComponent } from './hello.component';
import { QuillModule } from 'ngx-quill';
import { SocketioService } from './editor/socketio.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditorComponent } from './editor/editor.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [RouterModule, BrowserModule, ReactiveFormsModule, FormsModule, QuillModule.forRoot(), HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HelloComponent, EditorComponent, LoginComponent, RegisterComponent],
  providers: [SocketioService],
  bootstrap: [AppComponent],
})
export class AppModule { }
