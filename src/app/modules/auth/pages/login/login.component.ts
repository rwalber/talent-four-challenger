import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifier: NotifierService,
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      client_id: ['sinple-web'],
      client_secret: ['ZzVCevKWN9kQ1SNjahS6HhQ6yB4bqdc6'],
      grant_type: ['password']
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value, (status, response) => {
      if(status) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.router.navigate(['/dashboard']);
      } else {
        this.notifier.notify('error', response);
      }
    });
  }
}