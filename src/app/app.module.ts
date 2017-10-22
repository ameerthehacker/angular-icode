import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JwtHelper } from "angular2-jwt";

import { AuthGuard } from "./guards/auth/auth.guard";

import { AuthService } from "./services/auth/auth.service";
import { AppService } from "./services/app/app.service";
import { FlashMessageService } from "./services/flash-message/flash-message.service";
import { ShowProgressService } from "./services/show-progress/show-progress.service";
import { ModalService } from "./services/modal/modal.service";
import { TimerService } from './services/timer/timer.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from '../routes/app.routes';
import { LoginComponent } from './components/auth/login/login.component';
import { MessageComponent } from './components/shared/message/message.component';
import { ChallengesComponent } from "./components/challenges/challenges.component";
import { ChallengeComponent } from './components/challenges/challenge/challenge.component';

import { ChallengesListComponent } from './components/challenges/challenges-list/challenges-list.component';
import { ChallengesFormComponent } from './components/challenges/challenges-form/challenges-form.component';
import { FlashMessageComponent } from './components/shared/flash-message/flash-message.component';
import { ProgressComponent } from './components/shared/progress/progress.component';
import { ChallengeSubmissionComponent } from './components/challenges/challenge-submission/challenge-submission.component';
import { CodeEditorComponent } from './components/shared/code-editor/code-editor.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/groups/group/group.component';
import { GroupListComponent } from './components/groups/group-list/group-list.component';
import { GroupFormComponent } from './components/groups/group-form/group-form.component';
import { GroupProfileComponent } from './components/groups/group-profile/group-profile.component';
import { ListComponent } from './components/shared/list/list.component';
import { ContestsListComponent } from './components/contests/contests-list/contests-list.component';
import { ContestComponent } from './components/contests/contest/contest.component';
import { ContestsFormComponent } from './components/contests/contests-form/contests-form.component';
import { CodeSubmissionComponent } from "../app/components/shared/code-submission/code-submission.component";
import { CodeGroupSubmissionComponent } from './components/shared/code-group-submission/code-group-submission.component';
import { ContestSubmissionComponent } from './components/contests/contest-submission/contest-submission.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { Error403Component } from './components/errors/error403/error403.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { TimerComponent } from './components/shared/timer/timer.component';
import { AssignmentComponent } from './components/assignments/assignment/assignment.component';
import { AssignmentsFormComponent } from './components/assignments/assignments-form/assignments-form.component';
import { AssignmentsListComponent } from './components/assignments/assignments-list/assignments-list.component';
import { AssignmentSubmissionComponent } from './components/assignments/assignment-submission/assignment-submission.component';
import { LabWorksListComponent } from './components/lab-works/lab-works-list/lab-works-list.component';
import { LabWorkComponent } from './components/lab-works/lab-work/lab-work.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    MessageComponent,
    ChallengesComponent,
    ChallengeComponent,
    ChallengesListComponent,
    ChallengesFormComponent,
    FlashMessageComponent,
    ProgressComponent,
    ChallengeSubmissionComponent,
    CodeEditorComponent,
    SidebarComponent,
    GroupsComponent,
    GroupComponent,
    GroupListComponent,
    GroupFormComponent,
    GroupProfileComponent,
    ListComponent,
    ContestsListComponent,
    ContestComponent,
    ContestsFormComponent,
    CodeSubmissionComponent,
    CodeGroupSubmissionComponent,
    ContestSubmissionComponent,
    Error404Component,
    ErrorsComponent,
    Error500Component,
    Error403Component,
    ModalComponent,
    TimerComponent,
    AssignmentComponent,
    AssignmentsFormComponent,
    AssignmentsListComponent,
    AssignmentSubmissionComponent,
    LabWorksListComponent,
    LabWorkComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    AuthService,
    AppService,
    JwtHelper,
    AuthGuard,
    FlashMessageService,
    ShowProgressService,
    ModalService,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
