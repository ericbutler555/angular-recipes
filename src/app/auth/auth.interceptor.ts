import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // since both this.authService.user and the intercept itself are both observables, have to chain them (with a pipe):
    return this.authService.user
      .pipe(
        take(1), // "take(1)" simply takes a snapshot of the observable value instead of continuing to listen for changes to it - adding this here keeps us from having to manually unsubscribe to the "user" observable.
        exhaustMap(user => {
          // "exhaustMap" takes the source observable (here, "user") and feeds it into another observable (here, the "intercept" function)

          if (!user) { return next.handle(req); } // allow non-auth requests to simply pass through unmodified

          const modifiedRequest = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(modifiedRequest); // now this return is for the intercept function, even though it's nested.
        })
      );
  }
}
