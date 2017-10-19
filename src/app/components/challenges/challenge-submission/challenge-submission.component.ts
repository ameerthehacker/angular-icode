import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";

import { Challenge } from "../../../models/challenge";

@Component({
  selector: 'ic-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styles: []
})
export class ChallengeSubmissionComponent implements OnInit {

  challenge: Challenge;
  typeOfSubmission: string = 'practice';

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let challengeSlug = params.slug;
      this.authService.get(`challenges/${challengeSlug}`, (response) => {
        if(!response.error) {
          this.challenge = response.msg;
        }
        else {
          // TODO: Show internal error
        }
      });
    });
  }

}
