import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from '../routes/app.routes';
import { LoginComponent } from './components/auth/login/login.component';
import { MessageComponent } from './components/shared/message/message.component';
import { ChallengesComponent } from "./components/challenges/challenges.component";
import { ChallengeComponent } from './components/challenges/challenge/challenge.component';

import { AuthService } from "./services/auth/auth.service";
import { AppService } from "./services/app/app.service";
import { JwtHelper } from "angular2-jwt";
import { AuthGuard } from "./guards/auth/auth.guard";
import { ChallengesListComponent } from './components/challenges/challenges-list/challenges-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    MessageComponent,
    ChallengesComponent,
    ChallengeComponent,
    ChallengesListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [   
    AuthService, 
    AppService,
    JwtHelper,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
