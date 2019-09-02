import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthModel } from './auth.model';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router){}

  createUser(email: string, password: string) {
    const authData: AuthModel = {email: email, password: password};
    this.http.put<{message: string, result: AuthModel}>("http://localhost:3000/api/user/signup", authData)
    .subscribe(resposne => {
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListner.next(false);
    })
  }

  loginUser(email: string, password: string) {
    const authData: AuthModel = {email: email, password: password};
    this.http.put<{token: string, expiresIn: string, userId: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          this.userId= response.userId
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(parseInt( expiresInDuration));
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + parseInt(expiresInDuration) *1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListner.next(false);
      })
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUSerId() {
    return this.userId;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  autoAuthUser() {
    const now = new Date();
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const expiresIn = authInformation.expirationDate.getTime()  - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListner.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  logoutClicked() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.cleardata();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);

  }

  private cleardata() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || ! expiration) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expiration)
    }
  }

  private setAuthTimer(duration: number) {
    console.log(duration)
    this.tokenTimer = setTimeout(() => {
      this.logoutClicked();
    }, duration * 1000)
  }

}
