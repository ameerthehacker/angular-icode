import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { AUTH_ROUTES } from './auth.routes';

import { AuthGuard } from "../app/guards/auth/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'auth', children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);