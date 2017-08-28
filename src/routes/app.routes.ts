import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { ChallengesComponent } from "../app/components/challenges/challenges.component";
import { AUTH_ROUTES } from './auth.routes';
import { CHALLENGES_ROUTE } from "./challenges.routes";

import { AuthGuard } from "../app/guards/auth/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'auth', children: AUTH_ROUTES },
    { path: 'challenges', component: ChallengesComponent, children: CHALLENGES_ROUTE, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES);