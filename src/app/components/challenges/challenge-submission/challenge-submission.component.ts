import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Challenge } from "../../../models/challenge";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styles: []
})
export class ChallengeSubmissionComponent implements OnInit {

  challenge: Challenge;

  constructor(private actiavtedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // Get the actual challenge data
    this.actiavtedRoute.params.subscribe((params) => {
      this.authService.get('challenges/' + params['slug']).subscribe((response: any) => {
        if(!response.error) {
          this.challenge = response.msg;       
        }
        else {
          // TODO: Show internal error message
        }
      });
    });
  }

}
