import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthSuccessResponse, User } from '../auth.model';
import { environment } from './../../../environments/environment';
import { AuthService } from './../auth.service';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private route: Router,
    private authService: AuthService
  ) { }



  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap(authAction => {
        const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApi;
        return this.http.post<AuthSuccessResponse>(loginUrl, {
          email: authAction.email,
          password: authAction.password,
          returnSecureToken: true
        }).pipe(
          map(resData => AuthActions.authSuccess({
            email: resData.email,
            id: resData.localId,
            token: resData.idToken,
            tokenExpirationDate: new Date(new Date().getTime() + (+resData.expiresIn * 1000))
          })),
          catchError(this.handleError)
        )
      })
    )
  );
  signup$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signupStart),
      exhaustMap(authAction => {
        const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApi;
        return this.http.post<AuthSuccessResponse>(signupUrl, {
          email: authAction.email,
          password: authAction.password,
          returnSecureToken: true
        }).pipe(
          this.handleAuthSuccess(),
          catchError(this.handleError)
        )
      })
    )
  );

  authSaveAndRedirect$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.authSuccess),
      tap((resData) => {
        const user = new User(resData.id, resData.email, resData.token, resData.tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.route.navigate(['/', 'recipes']);
      })
    ), { dispatch: false }
  );

  autoLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {

          return { type: 'dummy' };
        }
        const userData: {
          id: string,
          email: string,
          _token: string,
          _tokenExpirationDate: string
        } = JSON.parse(userDataString);
        const user = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));
        if (user.token) {
          return AuthActions.authSuccess({
            email: user.email,
            id: user.id,
            token: user.token,
            tokenExpirationDate: new Date(userData._tokenExpirationDate)
          })
          // const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          // this.autoLogout(time);
        }
        return { type: 'dummy' }
      })
    )
  );
  autoLogout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout, AuthActions.authSuccess),
      tap((user) => {
        if (user.type === AuthActions.authSuccess.type)
          this.authService.setLogoutTimer(user.tokenExpirationDate.getTime() - new Date().getTime());
        if (user.type === AuthActions.logout.type)
          this.authService.clearLogoutTimer();
      }
      )),
    { dispatch: false }
  );

  private handleError(errors: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured!';
    if (!errors.error || !errors.error.error) {
      return of(AuthActions.authFail({ error: errorMessage }));
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
      return of(AuthActions.authFail({ error: errorMessage }));
    }
  }
  private handleAuthSuccess() {
    return map((resData: AuthSuccessResponse) => AuthActions.authSuccess({
      email: resData.email,
      id: resData.localId,
      token: resData.idToken,
      tokenExpirationDate: new Date(new Date().getTime() + (+resData.expiresIn * 1000))
    }))
  }
}
