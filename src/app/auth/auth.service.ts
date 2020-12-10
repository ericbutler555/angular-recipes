import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, throwError } from 'rxjs';
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
  user = new BehaviorSubject<User>(null); // making this an observable so diff parts of the app can react to changes (on login/logout)
  private autoLogoutTimer;

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
    localStorage.removeItem('user'); // remove data from localStorage
    if (this.autoLogoutTimer) clearTimeout(this.autoLogoutTimer); // remove the timer for auto-logging out
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
    const expiresInMs = (+response.expiresIn * 1000);
    const expirationDate = new Date(new Date().getTime() + expiresInMs);
    const theUser = new User(response.localId, response.email, response.idToken, expirationDate);
    this.user.next(theUser); // push the new user to anywhere that's subscribed/reacting to a current-user check
    localStorage.setItem('user', JSON.stringify(theUser)); // persist the user in the browser
    this.autoLogout(expiresInMs);
  }

  autoLogin() {
    // on page load, set login status if an active user is stored in localStorage:
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) return;
    const savedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      userData._tokenExpirationDate
    );
    if (savedUser.token) {
      // remember that the "token" getter here is different than the _token property set above
      this.user.next(savedUser);

      const remainingLogoutTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingLogoutTime);
    }
  }

  autoLogout(expiresInMs: number) {
    // since Firebase auth tokens are only valid for a while, need to automatically log user out once it expires:
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expiresInMs);
  }
}
