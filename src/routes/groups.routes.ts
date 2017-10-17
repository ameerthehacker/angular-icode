import { Router, Routes } from '@angular/router';
import { GroupProfileComponent } from '../app/components/groups/group-profile/group-profile.component';
import { GroupListComponent } from '../app/components/groups/group-list/group-list.component';
import { GroupFormComponent } from "../app/components/groups/group-form/group-form.component";

export const GROUPS_ROUTE: Routes = [
    { path: '', component: GroupListComponent },
    { path: 'new', component: GroupFormComponent },    
    { path: ':slug', component: GroupProfileComponent }
];