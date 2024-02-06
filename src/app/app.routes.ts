import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BuildingComponent } from './components/building/building.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "createUser", component: CreateUserComponent },
    { path: "building", component: BuildingComponent },
    { path: "home", component: HomeComponent },
    { path: "", pathMatch: 'full', redirectTo: "login" }
];
