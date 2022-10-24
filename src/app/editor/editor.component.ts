import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { CustomOption,  } from "ngx-quill";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { of, timeInterval } from 'rxjs';
import { io } from "socket.io-client";
import { SocketioService } from './socketio.service';
import { AuthService } from "../auth.service";
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


const SOCKET_ENDPOINT = 'http://localhost:1337';
declare let Quill;

@Component({
  selector: "app-root",
  templateUrl: "./editor.component.html"
})


export class EditorComponent {
  webTitle: string = "Eddies editor aka Eddietor"
  myForm: FormGroup;
  form: FormGroup;
  documents: string[] = [];;
  content: string;
  option: string;
  text: any;
  title: any;
  newCollab: any;
  test: string = "TESTTEST";
  allData: any = {};
  allDataThisEmail: any = {};
  allDataTitle: string[] = [];;
  selectedDocument: any;
  socket;
  editorInstance;
  contentID;
  idcollab: any = {};
  contentEDITORS;
  message: string;
  sendToSocket = true;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private socketService: SocketioService,
    public authService: AuthService
  ) { };

  private quillInstance: any;

  options: CustomOption[] = [
    {
      import: "attributors/style/size",
      whitelist: void 0,
    }
  ];

  checkoutForm = this.formBuilder.group({
    title: '',
    newCollab: '',
  });
  checkoutForm2 = this.formBuilder.group({
    docID: '',
  });

  async exportPdf() {
    const doc = new jsPDF();

    const pdfTable = this.text.html;

    var html = htmlToPdfmake(pdfTable);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();

  }


  // //////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.socketService.setupSocketConnection();
    const email = this.authService.getEmail();

    this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
      this.allData = data;

      for (let index = 0; index < this.allData.length; index++) {

        if (this.allData[index].collab) {
          for (let i = 0; i < this.allData[index].collab.length; i++) {
            // console.log(this.allData[index].collab[i], "----", email);
            if (this.allData[index].collab[i] == email) {
              this.allDataTitle.push(this.allData[index].title);
            }
          }
        }
      }
      // console.log(email);

    })
    // setTimeout(() => { console.log(this.allData); }, 2000)
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }


  onSubmit(): void {
    this.title = this.checkoutForm.value.title;
    const email = this.authService.getEmail();




    for (let index = 0; index < this.allData.length; index++) {
      // const element = array[index];
        if (this.allData[index].title == this.title) {
          this.http.put<any>('https://jsramverk-backend.azurewebsites.net/', { id: this.allData[index]._id, newContent: this.text.html }).subscribe(data => {
          })
          if (this.checkoutForm.value.newCollab) {
            this.http.put<any>('https://jsramverk-backend.azurewebsites.net/addCollab', { id: this.allData[index]._id, newCollab: this.checkoutForm.value.newCollab }).subscribe(data => {
            })
          }
        }
      }
      if (!this.allDataTitle.includes(this.title)) {
        if (this.checkoutForm.value.newCollab) {
          this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, collab: [email, this.checkoutForm.value.newCollab], content: this.text.html }).subscribe(data => {
            // this.text.text = data.id;
          })
          this.http.post<any>('https://jsramverk-backend.azurewebsites.net/sendmail', { title: this.title, sendToEmail: this.checkoutForm.value.newCollab, email: email }).subscribe(data => {
            // this sends the email
            console.log(this.checkoutForm.value.newCollab);
          })
        }
        if (!this.checkoutForm.value.newCollab) {
          this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, collab: [email], content: this.text.html }).subscribe(data => {
            // this adds the collab
          })
        }
      }

    setTimeout(() => {
      this.allDataTitle.splice(0);

      this.allData = {};

      this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
        this.allData = data;

        for (let index = 0; index < this.allData.length; index++) {

          if (this.allData[index].collab) {
            for (let i = 0; i < this.allData[index].collab.length; i++) {
              if (this.allData[index].collab[i] == email) {
                this.allDataTitle.push(this.allData[index].title);
              }
            }
          }
        }
      })
    }, 2000);
  }

  getDocuments() {
    this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
      return data;
    })
  }

  @ViewChild('document') document!: ElementRef;

  onSelected() {
    this.contentID = "";
    this.contentEDITORS = "";

    this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
      this.allData = data;
    })


    this.selectedDocument = this.document.nativeElement.value;
    this.option = this.selectedDocument;

    this.socketService.socket.emit('text option', this.selectedDocument)
    this.socketService.socket.on('server option', (data: string) => {
      this.option = data;
    });

    for (let index = 0; index < this.allData.length; index++) {
      const element = this.allData[index];

      if (this.selectedDocument == element.title) {
        this.content = element.content;
        this.contentID = element._id;
      }
    }

    fetch('https://jsramverk-backend.azurewebsites.net/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: "{alldata {_id, collab}}" })
    })
      .then(r => r.json())
      .then(data => this.idcollab = data.data.alldata);


      setTimeout(() => {
        for (let index = 0; index < this.idcollab.length; index++) {
          if (this.contentID == this.idcollab[index]._id) {
            this.contentEDITORS = this.idcollab[index].collab
          }
        }
      }, 600);
  }


  getOneDocument() {

  }

  onkeyup() {
    this.socketService.socket.emit('text editor', this.text.html)
  }

  // created(editorInstance) {
  //   this.editorInstance = editorInstance;
  // }

  onContentChanged = (event) => {
    this.text = event;


    // console.log("event.editor");
    this.socketService.socket.on('server editor', (data: string) => {
      // this.editorInstance.setContents([{ insert: data }]);
      // console.log(this.editorInstance);
      // console.log(data);

      this.content = data

    })

    // this.socketService.socket.emit('text editor', this.text.html)
    // this.socketService.socket.on('server editor', (data: string) => {
    //   // this.editorInstance.setContents([{ insert: data }]);
    //   // console.log(this.editorInstance);
    //   this.content = data
    // });
  }

  public Save() {
    this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, content: this.text.text }).subscribe(data => {
      // this.text.text = data.id;
    })
  }

  public logOut() {
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_token');
  }

}