import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  form: FormGroup;
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);
  }


  loginUser(event) {
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.authService.login(email, password).pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(["/editor"])
        },
        error: error => {
          console.log(error);

          alert(error.error.errors.message)
        }
      })

  }

}
