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

  constructor(private http: HttpClient) { }
  signUp(email: string, password: string) {
    return this.http.post<SignUpInResponse>(signupUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    } as SignUp).pipe(catchError(this.handleError), tap((response) => {
      this.handleUser(response.email,response.localId,response.idToken,+response.expiresIn);
    }));

  }
  login(email: string, password: string) {
    return this.http.post<SignUpInResponse>(loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    } as SignUp).pipe(catchError(this.handleError), tap((response) => {
      this.handleUser(response.email,response.localId,response.idToken,+response.expiresIn);
    }));

  }
  logout(){
    this.user.next(null);
  }
  private handleUser(email: string, id: string, token: string, expireNumber: number) {
    const expireDate = new Date(new Date().getTime() + expireNumber * 1000);
    const user = new User(id, email, token, expireDate)
    this.user.next(user);
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
