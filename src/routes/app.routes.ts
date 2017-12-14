import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { ChallengesComponent } from "../app/components/challenges/challenges.component";
import { PlaygroundComponent } from "../app/components/playground/playground.component";
import { GroupsComponent } from "../app/components/groups/groups.component";
import { UsersComponent } from '../app/components/users/users.component';
import { ErrorsComponent } from "../app/components/errors/errors.component";
import { AUTH_ROUTE } from './auth.routes';
import { CHALLENGES_ROUTE } from "./challenges.routes";
import { GROUPS_ROUTE } from "./groups.routes";
import { USERS_ROUTE } from './users.routes';
import { ERRORS_ROUTE } from './errors.route';

import { AuthGuard } from "../app/guards/auth/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'auth', children: AUTH_ROUTE },
    { path: 'challenges', component: ChallengesComponent, children: CHALLENGES_ROUTE, canActivate: [AuthGuard] },
    { path: 'playground', component: PlaygroundComponent },
    { path: 'groups', component: GroupsComponent, children: GROUPS_ROUTE, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, children: USERS_ROUTE, canActivate: [AuthGuard] },    
    { path: 'errors', component: ErrorsComponent, children: ERRORS_ROUTE },
    { path: '**', redirectTo: '/errors/404' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);