import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "editor", component: EditorComponent
  },
  {
    path: "", component: EditorComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "register", component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
