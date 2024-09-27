import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'signup', loadComponent: () =>import('./auth/signup/signup.component').then(m=>m.SignupComponent)},
    {path: 'login', loadComponent: () =>import('./auth/login/login.component').then(m=>m.LoginComponent)},
    {path: '', loadComponent: () =>import('./pages/home/home.component').then(m=>m.HomeComponent)},
    {path: '**', redirectTo: ''}
];
