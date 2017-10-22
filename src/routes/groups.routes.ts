import { Router, Routes } from '@angular/router';
import { GroupProfileComponent } from '../app/components/groups/group-profile/group-profile.component';
import { GroupListComponent } from '../app/components/groups/group-list/group-list.component';
import { GroupFormComponent } from "../app/components/groups/group-form/group-form.component";
// Routes for contests
import { CONTESTS_ROUTE } from './contests.routes';
// Routes for assignment
import { ASSIGNMENTS_ROUTE } from './assignments.routes';

export const GROUPS_ROUTE: Routes = [
    { path: '', component: GroupListComponent },
    { path: 'new', component: GroupFormComponent },
    { path: ':slug/assignments', component: GroupProfileComponent, children: ASSIGNMENTS_ROUTE },        
    { path: ':slug/contests', component: GroupProfileComponent, children: CONTESTS_ROUTE },
    { path: ':slug', redirectTo: ':slug/contests' },
    { path: ':slug/edit', component: GroupFormComponent }
];
