// session.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get session ID from local storage or wherever you store it
    const sessionId = localStorage.getItem('sessionId');

    // Clone the request and add session ID to headers
    const modifiedReq = req.clone({
      setHeaders: {
        'Session-ID': sessionId || '', // Add session ID if available
      },
    });

    // Pass on the modified request
    return next.handle(modifiedReq);
  }
}
