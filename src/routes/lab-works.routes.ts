import { Routes } from '@angular/router';

import { LabWorksListComponent } from "../app/components/lab-works/lab-works-list/lab-works-list.component";
import { LabWorkComponent } from "../app/components/lab-works/lab-work/lab-work.component";


export const LAB_WORKS_ROUTE: Routes = [
    { path: '', component: LabWorksListComponent }
];