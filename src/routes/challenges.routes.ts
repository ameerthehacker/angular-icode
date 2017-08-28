import { Routes } from "@angular/router";
import { ChallengesListComponent } from "../app/components/challenges/challenges-list/challenges-list.component";

export const CHALLENGES_ROUTE: Routes = [
    { path: '', component: ChallengesListComponent }
];