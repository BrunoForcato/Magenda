import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", pathMatch: 'full', redirectTo: "login" }
];
