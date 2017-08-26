import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { AUTH_ROUTES } from './auth.routes';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);