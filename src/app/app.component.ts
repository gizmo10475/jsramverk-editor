import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { CustomOption } from "ngx-quill";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})


export class AppComponent {
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
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { };


  options: CustomOption[] = [
    {
      import: "attributors/style/size",
      whitelist: void 0,
    }
  ];

  checkoutForm = this.formBuilder.group({
    title: '',
  });
  checkoutForm2 = this.formBuilder.group({
    docID: '',
  });

  onSubmit(): void {
    this.title = this.checkoutForm.value.title;

    for (let index = 0; index < this.allData.length; index++) {
      // const element = array[index];
      if (this.allData[index].title == this.title) {

        this.http.put<any>('https://jsramverk-backend.azurewebsites.net/', { id: this.allData[index]._id, newContent: this.text.html }).subscribe(data => {
        })
      }
    }
    if (!this.allDataTitle.includes(this.title)) {
      this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, content: this.text.html }).subscribe(data => {
        // this.text.text = data.id;
      })
    }

    setTimeout(() => {
      this.allDataTitle.splice(0);

      this.allData = {};

      this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
        this.allData = data;

        for (let index = 0; index < this.allData.length; index++) {
          this.allDataTitle.push(this.allData[index].title);
        }
      })
    }, 2000);


  }

  ngOnInit() {
    this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
      this.allData = data;

      for (let index = 0; index < this.allData.length; index++) {
        this.allDataTitle.push(this.allData[index].title);
      }
    })
  }

  getDocuments() {
    this.http.get<any>('https://jsramverk-backend.azurewebsites.net/').subscribe(data => {
      return data;
    })
  }

  @ViewChild('document') document!: ElementRef;

  onSelected() {
    this.selectedDocument = this.document.nativeElement.value;
    this.option = this.selectedDocument;
    for (let index = 0; index < this.allData.length; index++) {
      const element = this.allData[index];
  
      if (this.selectedDocument == element.title) {
        this.content = element.content;
      }
    }
  }


  getOneDocument() {

  }

  onContentChanged = (event) => {
    this.text = event;
  }

  public Save() {
    this.http.post<any>('https://jsramverk-backend.azurewebsites.net/', { title: this.title, content: this.text.text }).subscribe(data => {
      // this.text.text = data.id;
    })
  }

}