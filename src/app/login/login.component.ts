import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from '../service/login-api.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginApiService: LoginApiService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.router.navigate(['/']);
      //then goto dashboard
      return;
    } else {
    }

    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],

    });
  }

  submitForm() {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginApiService.register(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res,"response")
          localStorage.setItem('accessToken', res.token);
          this.router.navigate(['/']);
        },
      });
    }
  }
}
