import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseURL = environment["endPoint"];

  constructor(private httpClient: HttpClient) { }

  LoginUsuario(userModel: UserModel) {
    return this.httpClient.post<any>(`${this.baseURL}/CreateToken/`, userModel);
  }
}
