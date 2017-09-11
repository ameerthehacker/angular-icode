import { Routes } from "@angular/router";
import { ChallengesListComponent } from "../app/components/challenges/challenges-list/challenges-list.component";
import { ChallengesFormComponent } from "../app/components/challenges/challenges-form/challenges-form.component";
import { ChallengeSubmissionComponent } from "../app/components/challenges/challenge-submission/challenge-submission.component";

export const CHALLENGES_ROUTE: Routes = [
    { path: '', component: ChallengesListComponent },
    { path: 'new', component: ChallengesFormComponent },
    { path: ':slug', component: ChallengeSubmissionComponent }    
];