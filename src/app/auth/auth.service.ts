import { Router } from '@angular/router';
import { SignUp, SignUpInResponse, User } from './auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError, tap, Subject } from 'rxjs';

const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUNaW723GXRZ3Nfhg7NSFW79mrJW1Rq-4'
const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUNaW723GXRZ3Nfhg7NSFW79mrJW1Rq-4'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  expirationTimer: any;
  constructor(private http: HttpClient, private route:Router) { }
  signUp(email: string, password: string) {
    return this.http.post<SignUpInResponse>(signupUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    } as SignUp).pipe(catchError(this.handleError), tap((response) => {
      this.handleUser(response.email, response.localId, response.idToken, +response.expiresIn);
    }));

  }
  login(email: string, password: string) {
    return this.http.post<SignUpInResponse>(loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    } as SignUp).pipe(catchError(this.handleError), tap((response) => {
      this.handleUser(response.email, response.localId, response.idToken, +response.expiresIn);
    }));

  }
  logout() {
    console.log("logOut");
    this.user.next(null);
    localStorage.removeItem('userData');
    this.route.navigate(['auth']);
    clearTimeout(this.expirationTimer);
  }
  autoLogin() {
    console.log('AutoLogin!');

    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      console.log('Return!');
      return;
    }
    const userData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userDataString);
    const user = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));
    if (user.token) {
      this.user.next(user);
      const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(time);
    }
  }
  autoLogout(expirateTime_ms: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirateTime_ms)
  }
  private handleUser(email: string, id: string, token: string, expireNumber_sec: number) {
    const expireDate = new Date(new Date().getTime() + expireNumber_sec * 1000);
    const user = new User(id, email, token, expireDate)
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expireNumber_sec * 1000);
  }
  private handleError(errors: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured!';
    if (!errors.error || !errors.error.error) {
      return throwError(() => errorMessage);
    }
    else {
      switch (errors.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email is already registered!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email is not found!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Wrong password';
          break;
      }
      return throwError(() => errorMessage);
    }
  }
}
