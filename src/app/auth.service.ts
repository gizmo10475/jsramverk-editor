import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  helper = new JwtHelperService;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token')
    this._isLoggedIn$.next(!!token)
  }

  login(email: string, password: string) {

    return this.http.post<any>('https://jsramverk-backend.azurewebsites.net/auth/login', { email: email, password: password })
      .pipe(map(data => {
        console.log(data);

        localStorage.setItem('auth_token', data.data.token),
          localStorage.setItem('auth_email', data.data.email)
        // this._isLoggedIn$.next(true)
        return data;
      }
      ))
  }

  getEmail() {
    return localStorage.getItem('auth_email')
  }

  loggedIn() {
    const token = localStorage.getItem('auth_token')
    return !this.helper.isTokenExpired(token)
  }
}
