import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.email || !this.password) {
      this.error.set('Please enter email and password.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.email, this.password).subscribe(res => {
      this.loading.set(false);
      if (res.isSuccessful) {
        this.router.navigate(['/']);
      } else {
        this.error.set(res.message);
      }
    });
  }

  googleLogin() {
    this.loading.set(true);
    this.error.set('');
    this.auth.loginWithGoogle().subscribe(res => {
      this.loading.set(false);
      if (res.isSuccessful) {
        this.router.navigate(['/']);
      } else {
        this.error.set(res.message);
      }
    });
  }
}
