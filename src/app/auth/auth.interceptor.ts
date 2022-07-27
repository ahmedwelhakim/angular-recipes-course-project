import {
  HttpEvent, HttpHandler, HttpInterceptor,
  HttpParams, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take } from 'rxjs';
import * as fromApp from './../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe(
      take(1),
      map(userState => userState.user),
      exhaustMap(user => {
        if (user === null) {
          return next.handle(request);
        }
        else {
          let modifiedReq = request.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(modifiedReq);
        }
      })
    )
  }
}
