import { Router, Routes } from '@angular/router';
import { GroupProfileComponent } from '../app/components/groups/group-profile/group-profile.component';
import { GroupListComponent } from '../app/components/groups/group-list/group-list.component';

export const GROUPS_ROUTE: Routes = [
    { path: '', component: GroupListComponent },
    { path: ':slug', component: GroupProfileComponent }
];
