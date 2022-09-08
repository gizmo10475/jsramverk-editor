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
  documents: [];
  text: any;
  title: any;
  test: string="TESTTEST";
  allData: any;
  allDataTitle: string[] = [];;
  selectedDocument: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    ) {};


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
    console.log(this.title);
    console.log(this.text.text);
    this.http.post<any>('http://localhost:1337/', { title: this.title, content: this.text.text }).subscribe(data => {
        // this.text.text = data.id;
  })
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:1337/').subscribe(data => {
      this.allData = data;
      // console.log(this.allData);
      
      for (let index = 0; index < this.allData.length; index++) {
        this.allDataTitle.push(this.allData[index].title);
      }
    })
    console.log(this.allDataTitle);
            
  }

  getDocuments() {
    this.http.get<any>('http://localhost:1337/').subscribe(data => {
        return data;
    }) 
  }

  @ViewChild('document') document!: ElementRef;

	onSelected() {
		this.selectedDocument = this.document.nativeElement.value;
    console.log(this.selectedDocument);
    
	}


  getOneDocument() {
    console.log("hej");
    
  }

  onContentChanged = (event) => {
    // console.log(event.html);
    this.text = event;
    // console.log(this.text);
  }

  public Save() {
    console.log(this.text.text);

    this.http.post<any>('http://localhost:1337/', { title: this.title, content: this.text.text }).subscribe(data => {
        // this.text.text = data.id;
  })
  }

}
