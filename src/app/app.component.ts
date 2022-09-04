import { Component, Input } from "@angular/core";
import { CustomOption } from "ngx-quill";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
var htmlText = "";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})


export class AppComponent {
  editForm: FormGroup;
  text: string = "";

  ngOnInit() {
    this.editForm = new FormGroup({
      text: new FormControl(null)
    });
  }

  options: CustomOption[] = [
    {
      import: "attributors/style/size",
      whitelist: void 0,
    }
  ];

  onContentChanged = (event) => {
    // console.log(event.html);
    // this.text = this.editForm.value.text;
  }

  public Save() {
    console.log(this.editForm.value.text);
  }

}
