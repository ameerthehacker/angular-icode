import { Routes } from '@angular/router';

import { ContestsListComponent } from "../app/components/contests/contests-list/contests-list.component";
import { ContestComponent } from "../app/components/contests/contest/contest.component";

export const CONTESTS_ROUTE: Routes = [
    { 'path': '', component: ContestsListComponent },
    { 'path': ':contestSlug', component: ContestComponent  }
];