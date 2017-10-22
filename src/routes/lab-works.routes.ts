import { Routes } from '@angular/router';

import { LabWorksListComponent } from "../app/components/lab-works/lab-works-list/lab-works-list.component";
import { LabWorkComponent } from "../app/components/lab-works/lab-work/lab-work.component";
import { LabWorksFormComponent } from "../app/components/lab-works/lab-works-form/lab-works-form.component";
import { LabWorkSubmissionComponent } from "../app/components/lab-works/lab-work-submission/lab-work-submission.component";


export const LAB_WORKS_ROUTE: Routes = [
    { path: '', component: LabWorksListComponent },
    { path: 'new', component: LabWorksFormComponent },   
    { path: ':labWorkSlug/edit', component: LabWorksFormComponent  },
    { path: ':labWorkSlug/submission', component: LabWorkSubmissionComponent  }
];