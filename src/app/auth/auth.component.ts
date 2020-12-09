import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return false;

    if (this.isLoginMode) {
      this.authService.login(form.value).subscribe(() => {
        this.router.navigate(['/recipes']);
      }, err => {
        this.error = err;
      });
    } else {
      this.authService.signup(form.value).subscribe(() => {
        this.router.navigate(['/recipes']);
      }, err => {
        this.error = err;
      });
    }
    form.reset();
  }
}
