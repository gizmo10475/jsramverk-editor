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

  // checkoutForm = this.formBuilder.group({
  //   title: '',
  // });
  // checkoutForm2 = this.formBuilder.group({
  //   docID: '',
  // });

  // ngOnInit() {

  //   this.socketService.setupSocketConnection();

  //   this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
  //     this.allData = data;

  //     for (let index = 0; index < this.allData.length; index++) {
  //       this.allDataTitle.push(this.allData[index].title);
  //     }
  //   })
  // }

  // ngOnDestroy() {
  //   this.socketService.disconnect();
  // }


  // onSubmit(): void {
  //   this.title = this.checkoutForm.value.title;

  //   for (let index = 0; index < this.allData.length; index++) {
  //     // const element = array[index];
  //     if (this.allData[index].title == this.title) {

  //       this.http.put<any>('https://jsramverk-backend.azurewebsites.net/', { id: this.allData[index]._id, newContent: this.text.html }).subscribe(data => {
  //       })
  //     }
  //   }
  //   if (!this.allDataTitle.includes(this.title)) {
  //     this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, content: this.text.html }).subscribe(data => {
  //       // this.text.text = data.id;
  //     })
  //   }

  //   setTimeout(() => {
  //     this.allDataTitle.splice(0);

  //     this.allData = {};

  //     this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
  //       this.allData = data;

  //       for (let index = 0; index < this.allData.length; index++) {
  //         this.allDataTitle.push(this.allData[index].title);
  //       }
  //     })
  //   }, 2000);
  // }

  // getDocuments() {
  //   this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
  //     return data;
  //   })
  // }

  // @ViewChild('document') document!: ElementRef;

  // onSelected() {

  //   this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
  //     this.allData = data;
  //   })

  //   this.selectedDocument = this.document.nativeElement.value;
  //   this.option = this.selectedDocument;

  //   this.socketService.socket.emit('text option', this.selectedDocument)
  //   this.socketService.socket.on('server option', (data: string) => {
  //     this.option = data;
  //   });

  //   for (let index = 0; index < this.allData.length; index++) {
  //     const element = this.allData[index];

  //     if (this.selectedDocument == element.title) {
  //       this.content = element.content;
  //     }
  //   }
  // }


  // getOneDocument() {

  // }

  // onkeyup() {
  //   this.socketService.socket.emit('text editor', this.text.html)
  // }

  // created(editorInstance) {
  //   this.editorInstance = editorInstance;
  // }

  // onContentChanged = (event) => {
  //   this.text = event;


  //   // console.log("event.editor");
  //   this.socketService.socket.on('server editor', (data: string) => {
  //     // this.editorInstance.setContents([{ insert: data }]);
  //     // console.log(this.editorInstance);
  //     // console.log(data);

  //     this.content = data

  //   })

  //   // this.socketService.socket.emit('text editor', this.text.html)
  //   // this.socketService.socket.on('server editor', (data: string) => {
  //   //   // this.editorInstance.setContents([{ insert: data }]);
  //   //   // console.log(this.editorInstance);
  //   //   this.content = data
  //   // });
  // }

  // public Save() {
  //   this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, content: this.text.text }).subscribe(data => {
  //     // this.text.text = data.id;
  //   })
  // }

}