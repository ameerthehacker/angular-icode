import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import date from 'date-and-time';

import { AuthService } from "../../../services/auth/auth.service";

import { Contest } from "../../../models/contest";

declare var date;

@Component({
  selector: 'ic-contest',
  templateUrl: './contest.component.html',
  styles: []
})
export class ContestComponent implements OnInit {

  @Input()
  contest: Contest;
  canRegister: boolean = true;
  canParticipate: boolean = true;
  btnRegisterText: string = 'Register';
  registrationEndDate: Date;
  contestStartDate: string;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Check if registration is open
    let registrationEndDate = new Date(this.contest.registrationEndDate);
    let contestStartDate = new Date(this.contest.contestStartDate);    
    if(Date.now() >= registrationEndDate.getTime()) {
      this.canRegister = false;
      this.btnRegisterText = 'Registration Closed'
    }
    this.registrationEndDate = date.format(registrationEndDate, 'D MMM YYYY', true);
    this.contestStartDate = date.format(contestStartDate, 'D MMM YYYY, hh:mm A', true);
  }
}