import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  isOwner: boolean;
  groupSlug: string;
  @Output('delete')
  contestDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Set the ownership flag
    if(this.contest.userId == this.authService.getCurrentUserId()) {
      this.isOwner = true;
    }
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
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
  onBtnDeleteClick(evt) {
    evt.preventDefault();
    if(confirm('Are you sure to delete this contest')) {
      this.authService.delete(`groups/${this.groupSlug}/contests/${this.contest.slug}`, (response) => {
        if(!response.error) {
          this.contestDeleted.emit(this.contest.slug);
        }
        else {
          // TODO: Show internal error
        }
      });
    }
  }
}