import { Routes } from '@angular/router';

import { AssignmentsListComponent } from "../app/components/assignments/assignments-list/assignments-list.component";
import { AssignmentComponent } from "../app/components/assignments/assignment/assignment.component";
import { AssignmentsFormComponent } from "../app/components/assignments/assignments-form/assignments-form.component";
import { AssignmentSubmissionComponent } from "../app/components/assignments/assignment-submission/assignment-submission.component";

export const ASSIGNMENTS_ROUTE: Routes = [
    { path: '', component: AssignmentsListComponent },
    { path: 'new', component: AssignmentsFormComponent },   
    { path: ':assignmentSlug/edit', component: AssignmentsFormComponent  },
    { path: ':assignmentSlug/submission', component: AssignmentSubmissionComponent  }
];