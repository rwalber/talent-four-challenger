import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken === '') {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
    return next.handle(request);
  }
}

@NgModule({
  providers: [{
     provide: HTTP_INTERCEPTORS,
     useClass: AuthenticatedInterceptor,
     multi: true,
  }]
})
export class Interceptor { }