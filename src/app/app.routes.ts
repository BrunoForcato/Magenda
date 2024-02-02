import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BuildingComponent } from './components/building/building.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "building", component: BuildingComponent },
    { path: "", pathMatch: 'full', redirectTo: "login" }
];
