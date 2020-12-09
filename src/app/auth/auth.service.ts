import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user';

// can create this here since we're only ever using it here in the auth service.
// it's not necessary, but this just gives us TypeScript type hinting.
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // only part of login response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key: string = 'AIzaSyD4LZhPf2Wly567ZNZFxw1hsO8MWEg9uzU'; // unique "Web API Key" found in my Firebase project settings
  user = new Subject<User>(); // making this an observable so diff parts of the app can react to changes (on login/logout)

  constructor(private http: HttpClient, private router: Router) { }

  signup(creds) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.api_key,
      {
        "email": creds.email,
        "password": creds.password,
        "returnSecureToken": true
      })
      .pipe(catchError(this.handleAuthError)) // "catchError" fires if there's any non-200 response, otherwise ignored
      .pipe(tap(x => this.setUser(x))); // "tap" does some side-work that doesn't interrupt the subscription. here we're just skimming off the successful response data to create a user out of it.
  }

  login(creds) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.api_key,
      {
        "email": creds.email,
        "password": creds.password,
        "returnSecureToken": true
      })
      .pipe(catchError(this.handleAuthError))
      .pipe(tap(x => this.setUser(x)));
  }

  logout() {
    this.user.next(null); // push a null user to anywhere that's subscribed/reacting to a current-user check
    this.router.navigate(['/logout']); // totally optional, but nice for user to see they've logged out
  }

  private handleAuthError(err) {
    let message = '';
    switch(err.error.error.message) {
      // signup error flags:
      case 'EMAIL_EXISTS':
        message = 'Sorry, this email address is already registered.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = 'Sorry, too many attempts. Please try again later.';
        break;
      // login error flags:
      case 'EMAIL_NOT_FOUND':
        message = 'Sorry, that email address doesn\'t seem to be registered yet.';
        break;
      case 'INVALID_PASSWORD':
        message = 'Invalid password, please try again.';
        break;
      default:
        message = 'Sorry, an error occurred.';
    }
    return throwError(message);
  }

  private setUser(response) {
    const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
    const theUser = new User(response.localId, response.email, response.idToken, expirationDate);
    this.user.next(theUser); // push the new user to anywhere that's subscribed/reacting to a current-user check
  }
}
