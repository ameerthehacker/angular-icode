import { Routes } from '@angular/router';

import { ContestsListComponent } from "../app/components/contests/contests-list/contests-list.component";
import { ContestComponent } from "../app/components/contests/contest/contest.component";
import { ContestsFormComponent } from "../app/components/contests/contests-form/contests-form.component";

export const CONTESTS_ROUTE: Routes = [
    { 'path': '', component: ContestsListComponent },
    { 'path': 'new', component: ContestsFormComponent },   
    { 'path': ':contestSlug', component: ContestComponent  },
    { 'path': ':contestSlug/edit', component: ContestsFormComponent  }    
];