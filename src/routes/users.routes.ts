import { Routes } from '@angular/router';

import { UsersListComponent } from '../app/components/users/users-list/users-list.component';
import { UsersFormComponent } from '../app/components/users/users-form/users-form.component';

export const USERS_ROUTE = [
    { path: '', component: UsersListComponent },
    { path: ':username/edit', component: UsersFormComponent }
];