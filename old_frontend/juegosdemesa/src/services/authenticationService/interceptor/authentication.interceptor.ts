import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './../authentication.service';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}