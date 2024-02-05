import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  failedLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private localStorageService: LocalStorageService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    var loginFormValue = this.loginForm.getRawValue() as UserModel;
    this.loginService.LoginUsuario(loginFormValue).subscribe(
      token => {
        this.localStorageService.setItem('token', token)
        this.localStorageService.setItem('user', JSON.stringify(loginFormValue));
        this.router.navigate(['home']);
      }, erro => { this.failedLogin = true }
    )
  }

  forgotPassword() {
    this.router.navigate(['building'])
  }

  async isAuthenticated() {
    const userString = await this.localStorageService.getItem('user');
    if (userString !== null) {
      this.router.navigate(['home']);
    }
  }
}
