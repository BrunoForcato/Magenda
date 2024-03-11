import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  CreateUserForm!: FormGroup;
  failedLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.CreateUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    var formValue = this.CreateUserForm.getRawValue() as UserModel;
    this.loginService.CreateUser(formValue).subscribe(
      result => {
        if (result == 'Usuário Adicionado com Sucesso') {
          this.router.navigate(['login']);
        }
      })
  }

  toLoginPage() {
    this.router.navigate(['login']);
  }
}
