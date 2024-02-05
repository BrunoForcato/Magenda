import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

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
    loginFormValue.name = 'Bruno';
    this.localStorageService.setItem('user', JSON.stringify(loginFormValue));

    this.router.navigate(['home']);
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
