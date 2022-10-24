import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { CustomOption,  } from "ngx-quill";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { io } from "socket.io-client";
import { SocketioService } from './editor/socketio.service';
import { RouterModule } from '@angular/router';
import { AuthService } from "./auth.service";

const SOCKET_ENDPOINT = 'http://localhost:1337';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})


export class AppComponent{
  webTitle: string = "Eddies editor aka Eddietor"
  myForm: FormGroup;
  form: FormGroup;
  documents: string[] = [];;
  content: string;
  option: string;
  text: any;
  title: any;
  test: string = "TESTTEST";
  allData: any = {};
  allDataTitle: string[] = [];;
  selectedDocument: any;
  socket;
  editorInstance;
  message: string;
  sendToSocket = true;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private socketService: SocketioService,
    public authService: AuthService
  ) { };


  options: CustomOption[] = [
    {
      import: "attributors/style/size",
      whitelist: void 0,
    }
  ];

}