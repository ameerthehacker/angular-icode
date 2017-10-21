import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from '../../../services/auth/auth.service';

import { Challenge } from '../../../models/challenge';
import { Contest } from '../../../models/contest';

@Component({
  selector: 'ic-contest-submission',
  templateUrl: './contest-submission.component.html',
  styles: []
})
export class ContestSubmissionComponent implements OnInit {

  challenges: Challenge[] = [];
  groupSlug: string;
  contestSlug: string;
  contest: Contest = new Contest();

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.contestSlug = params.contestSlug;
    });
    this.authService.get(`groups/${this.groupSlug}/contests/${this.contestSlug}`, (response) => {
      if(!response.error) {
        this.contest = response.msg;
        // Load the challenges for the contest
        this.authService.get(`groups/${this.groupSlug}/contests/${this.contestSlug}/challenges`, (response) => {
          if(!response.error) {
            this.challenges = response.msg;
          }
        });        
      }
    });
  }

}
