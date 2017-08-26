import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/auth/login/login.component';

export const AUTH_ROUTES: Routes = [
    { path: 'login', component: LoginComponent }
];