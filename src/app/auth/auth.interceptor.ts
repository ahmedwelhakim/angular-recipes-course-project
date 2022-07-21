import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, take, exhaustMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      if(user === null){
        return next.handle(request);
      }
      else{
        let modifiedReq = request.clone({
          params:new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      }
    }))
  }
}
