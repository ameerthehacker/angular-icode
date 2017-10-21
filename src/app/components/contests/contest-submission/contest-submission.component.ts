import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from '../../../services/auth/auth.service';
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";

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

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageService: FlashMessageService, private router: Router) { }

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
        if(!this.contest.userRegistered) {
          this.flashMessageService.addFlashMessage(['Sorry! you have not registered for this contest'], 'negative');
          this.router.navigate(['/groups', this.groupSlug, 'contests']);
          return;
        } 
        if(!this.contest.isRunning) {
          this.flashMessageService.addFlashMessage(['Sorry! The contest is not running now'], 'negative');          
          this.router.navigate(['/groups', this.groupSlug, 'contests']); 
          return;          
        }
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
