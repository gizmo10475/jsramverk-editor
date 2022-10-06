import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(event) {
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    console.log(email, password);

    try {
      this.http.post<any>('https://jsramverk-backend.azurewebsites.net/auth/register', { email: email, password: password }).subscribe(data => {
        console.log(data);
        this.router.navigate(["/login"])

      })
    } catch (err) {
      window.alert(err)
    }


  }


}
