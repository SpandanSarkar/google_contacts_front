import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginApiService } from '../service/login-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private loginApiService: LoginApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.router.navigate(['/']);
      //then goto dashboard
      return;
    } else {
    }

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    console.log('called');
    if (this.signInForm.valid) {
      // console.log(this.signInForm.value);
      this.loginApiService.login(this.signInForm.value).subscribe({
        next: (res) => {
          if(res.status===404){
            alert("Username and Password not found")
            this.router.navigate(['/login']);
          }
          else if(res.status===200){
            console.log(res, 'response');
            localStorage.setItem('accessToken', res.token);
            this.router.navigate(['/']);
          }
          else{

          }
        },
      });
    }
  }
}
