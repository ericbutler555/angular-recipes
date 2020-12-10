import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return type is Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    return this.authService.user
      .pipe(take(1))
      .pipe(map(user => {
        const isLoggedIn: boolean = !!user;
        if (isLoggedIn) {
          return true; // will allow route to render as usual
        } else {
          return this.router.createUrlTree(['/auth']); // will redirect user to auth page
        }
      }));
  }
}
